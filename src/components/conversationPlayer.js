// Imperative "typing" player shared by the hero theater and the example
// carousel. It writes directly into a DOM node rather than going through
// React state, because a character-by-character re-render across three
// simultaneous conversations is a lot of reconciliation for no benefit.

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Replies arrive as markdown. We render into textContent, so flatten the
// syntax instead of leaving asterisks and hashes on screen.
export function stripMd(text) {
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s*[-*_]{3,}\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// The user model can reply to a specific earlier message by prefixing
// "<reply:N>", where N is 1-based over the whole prior history. Pull the tag
// off and keep the target.
const REPLY_TAG = /^<reply:(\d+)>\s*/;

function stripReplyTag(text) {
  return text.replace(REPLY_TAG, '');
}

// Resolve reply tags into iMessage-style quotes. Note the model sometimes
// miscounts and points at its own earlier message; we render what it actually
// referenced rather than guessing at what it meant.
export function prepareMessages(messages) {
  let lastTarget = null;
  return messages.map((m, i) => {
    const match = m.text.match(REPLY_TAG);
    const text = match ? m.text.slice(match[0].length) : m.text;
    if (!match) {
      lastTarget = null;
      return { ...m, text, quote: null };
    }

    const target = Number(match[1]) - 1;
    const valid = target >= 0 && target < i;
    // A run of consecutive replies to the same message quotes it once,
    // rather than repeating the same header six times.
    const repeated = target === lastTarget;
    lastTarget = valid ? target : null;

    return {
      ...m,
      text,
      quote:
        valid && !repeated
          ? {
              role: messages[target].role,
              text: stripReplyTag(messages[target].text),
            }
          : null,
    };
  });
}

// The user model sometimes writes *emphasis* in its thoughts; show it plain.
export function cleanThink(text) {
  return text.replace(/\*\*([^*\n]+)\*\*/g, '$1').replace(/\*([^*\n]+)\*/g, '$1');
}

export function clip(text, n) {
  if (text.length <= n) return text;
  const cut = text.slice(0, n);
  const sp = cut.lastIndexOf(' ');
  return cut.slice(0, sp > 0 ? sp : n) + '…';
}

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function createPlayer(container, options = {}) {
  const { thinkLabel = 'thinking', clipThink = 150, clipReply = 260 } = options;

  const player = {
    cancelled: false,
    cancel() {
      this.cancelled = true;
    },
  };

  const scroll = () => {
    container.scrollTop = container.scrollHeight;
  };

  async function addThink(text) {
    const bubble = el('div', 'imp-think');
    bubble.appendChild(el('span', 'imp-think-label', thinkLabel));
    const body = el('span', 'imp-think-body');
    bubble.appendChild(body);
    container.appendChild(bubble);

    // The thought is context, not the performance — reveal it quickly.
    const words = clip(cleanThink(text), clipThink).split(' ');
    for (let i = 0; i < words.length; i += 1) {
      if (player.cancelled) return;
      body.textContent += (i ? ' ' : '') + words[i];
      scroll();
      await sleep(18);
    }
    await sleep(320);
  }

  function addQuote(quote) {
    const wrap = el('div', 'imp-quote');
    wrap.appendChild(
      el('span', 'imp-quote-who', quote.role === 'user' ? 'Ben' : 'AI Assistant')
    );
    wrap.appendChild(
      el('span', 'imp-quote-text', clip(stripMd(quote.text), 120))
    );
    container.appendChild(wrap);
    scroll();
  }

  async function typeUser(text) {
    const bubble = el('div', 'imp-msg imp-user');
    const body = el('span', 'imp-body');
    bubble.appendChild(body);
    const caret = el('span', 'imp-caret');
    bubble.appendChild(caret);
    container.appendChild(bubble);
    scroll();

    for (let i = 0; i < text.length; i += 1) {
      if (player.cancelled) return;
      const ch = text[i];
      body.textContent += ch;
      scroll();
      // Jittered human typing: slower on punctuation, occasional hesitation.
      let d = 26 + Math.random() * 55;
      if (ch === ' ' && Math.random() < 0.12) d += 180;
      if ('.,?!'.indexOf(ch) !== -1) d += 140;
      if (Math.random() < 0.03) d += 320;
      await sleep(d);
    }
    caret.remove();
    await sleep(420);
  }

  async function streamAssistant(text) {
    const bubble = el('div', 'imp-msg imp-ai');
    const dots = el('span', 'imp-dots');
    dots.appendChild(el('i'));
    dots.appendChild(el('i'));
    dots.appendChild(el('i'));
    bubble.appendChild(dots);
    container.appendChild(bubble);
    scroll();

    await sleep(700 + Math.random() * 500);
    if (player.cancelled) return;
    dots.remove();

    const body = el('span', 'imp-body');
    bubble.appendChild(body);
    const words = clip(stripMd(text), clipReply).split(' ');
    for (let i = 0; i < words.length; i += 1) {
      if (player.cancelled) return;
      body.textContent += (i ? ' ' : '') + words[i];
      scroll();
      await sleep(30 + Math.random() * 45);
    }
    await sleep(600);
  }

  // Play a conversation once, optionally without the thought bubbles.
  player.play = async function play(messages, showThoughts = true) {
    for (let i = 0; i < messages.length; i += 1) {
      if (player.cancelled) return;
      const m = messages[i];
      if (m.role === 'user') {
        if (m.think && showThoughts) await addThink(m.think);
        if (player.cancelled) return;
        if (m.quote) addQuote(m.quote);
        await typeUser(m.text);
      } else {
        await streamAssistant(m.text);
      }
    }
  };

  // Render a whole conversation at once, no animation. Used for "show all"
  // and for reduced motion.
  player.renderAll = function renderAll(messages, showThoughts = true) {
    container.innerHTML = '';
    messages.forEach((m) => {
      if (m.role === 'user') {
        if (m.think && showThoughts) {
          const t = el('div', 'imp-think');
          t.appendChild(el('span', 'imp-think-label', thinkLabel));
          t.appendChild(el('span', 'imp-think-body', cleanThink(m.think)));
          container.appendChild(t);
        }
        if (m.quote) addQuote(m.quote);
        const u = el('div', 'imp-msg imp-user');
        u.appendChild(el('span', 'imp-body', m.text));
        container.appendChild(u);
      } else {
        const a = el('div', 'imp-msg imp-ai');
        a.appendChild(el('span', 'imp-body', clip(stripMd(m.text), clipReply)));
        container.appendChild(a);
      }
    });
    container.scrollTop = 0;
  };

  // Loop forever, clearing between passes. Used by the hero.
  player.loop = async function loop(messages, startDelay = 0) {
    await sleep(startDelay);
    while (!player.cancelled) {
      container.innerHTML = '';
      await player.play(messages);
      if (player.cancelled) return;
      await sleep(2600);
    }
  };

  return player;
}
