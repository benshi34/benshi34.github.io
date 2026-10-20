import { useLayoutEffect, useRef } from 'react';

// A Homecoming "Ask" answer, drawn as an app window with the screenshots' 1440px width. Each window is laid out at
// full size and scaled down to fit, like an image.

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="6.75" cy="6.75" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="10.3" y1="10.3" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <polyline points="6,3 11,8 6,13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="1.75" y="3" width="12.5" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5.5" cy="6.5" r="1.1" fill="currentColor" />
      <polyline points="2.5,12 6.5,8.5 9,10.5 11,9 13.5,11.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

// **bold**, *italic* and [label](record:ROWID) citations, which the app draws as chips.
function inline(text) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(record:\d+\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push(<strong key={m.index}>{inline(m[1])}</strong>);
    else if (m[2] !== undefined) parts.push(<em key={m.index}>{m[2]}</em>);
    else parts.push(<span key={m.index} className="axw-cite">{m[3]}</span>);
    last = re.lastIndex;
  }
  parts.push(text.slice(last));
  return parts;
}

// The app's avatars (renderer/explore.tsx): initials on a color picked from the name.
const AVATAR_TONES = ['#007aff', '#28cd41', '#ff9500', '#ff2d55', '#af52de', '#30b0c7', '#5856d6', '#ff3b30', '#a2845e'];
function toneOf(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)) >>> 0;
  return AVATAR_TONES[h % AVATAR_TONES.length];
}
function initials(name) {
  const w = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '';
  return ([...w[0]][0] + (w.length > 1 ? [...w[w.length - 1]][0] : '')).toUpperCase();
}

const asset = (src) => `${process.env.PUBLIC_URL}${src}`;

// A [[chat:…]] embed, as the app's ChatCard draws it (renderer/embeds.tsx).
function ChatCard({ name, meta, group, oneSided, messages }) {
  return (
    <div className="axw-chat">
      <div className="axw-chat-head">
        <span className="axw-avatar" style={{ '--tone': toneOf(name) }} aria-hidden="true">{initials(name)}</span>
        <span className="axw-chat-who">
          <b>{name}</b>
          <span>{meta}</span>
        </span>
        <span className="axw-icon axw-chat-chevron"><Chevron /></span>
      </div>
      <div className="axw-chat-body">
        {messages.map((m, i) => {
          const prev = messages[i - 1];
          const newDay = !!prev && prev.day !== m.day;
          const newSender = !prev || prev.me !== m.me || prev.author !== m.author || newDay || prev.kind === 'reaction';
          const who = m.me ? 'You' : m.author ?? name;
          return (
            <div key={i}>
              {newDay && <div className="axw-chat-time">{m.day}</div>}
              {m.kind === 'reaction' ? (
                <div className="axw-reaction">{who} {m.text[0].toLowerCase() + m.text.slice(1)}</div>
              ) : (
                <div className={`axw-msg ${m.me ? 'me' : 'them'}${newSender ? ' first' : ''}`}>
                  {group && !m.me && newSender && <div className="axw-msg-author">{who}</div>}
                  {m.image && <div className="axw-msg-image"><img src={asset(m.image)} alt="" /></div>}
                  {m.text && <div className={`axw-bubble ${m.me ? 'me' : 'them'}`}>{m.text}</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {oneSided && <div className="axw-chat-foot">{meta.split(' · ')[0]} keeps only your side</div>}
    </div>
  );
}

// A [[photos:…]] embed: the photos side by side, then where and when.
function PhotoGrid({ photos, caption }) {
  return (
    <div className={`axw-photos n${Math.min(3, photos.length)}`}>
      <div className="axw-photos-grid">
        {photos.map((src) => <div key={src}><img src={asset(src)} alt="" /></div>)}
      </div>
      {caption && <div className="axw-photos-cap"><span className="axw-icon"><PhotoIcon /></span>{caption}</div>}
    </div>
  );
}

// The Markdown Ask answers are written in: paragraphs, "- " bullets, and embeds on lines of their own.
function Answer({ markdown, embeds = {} }) {
  const blocks = [];
  let bullets = null;
  for (const line of markdown.split('\n')) {
    if (line.startsWith('- ')) {
      if (!bullets) blocks.push((bullets = []));
      bullets.push(line.slice(2));
    } else {
      bullets = null;
      if (line.trim()) blocks.push(line);
    }
  }
  return blocks.map((b, i) => {
    if (Array.isArray(b)) return <ul key={i}>{b.map((li, j) => <li key={j}>{inline(li)}</li>)}</ul>;
    const e = /^\[\[(chat|photos?):([^\]]+)\]\]$/.exec(b.trim());
    const d = e && embeds[`${e[1] === 'chat' ? 'chat' : 'photos'}:${e[2]}`];
    if (d) return d.kind === 'chat' ? <ChatCard key={i} {...d} /> : <PhotoGrid key={i} {...d} />;
    return <p key={i}>{inline(b)}</p>;
  });
}

// As tall as the answer needs, and never shorter than the screenshots.
export function AskWindow({ question, lookedUp, answer, embeds }) {
  const ref = useRef(null);
  const content = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const fit = () => {
      el.style.setProperty('--axw-scale', el.clientWidth / 1440);
      el.style.setProperty('--axw-height', Math.max(790, Math.ceil(content.current.offsetHeight + 30)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    observer.observe(content.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="axw" ref={ref}>
      <div className="axw-canvas">
        <div className="axw-content" ref={content}>
          <div className="axw-question">{question}</div>
          <div className="axw-lookup">
            <span className="axw-icon"><Chevron /></span>
            <span className="axw-icon"><SearchIcon /></span>
            <span>{lookedUp}</span>
          </div>
          <Answer markdown={answer} embeds={embeds} />
        </div>
      </div>
    </div>
  );
}

function AskExample({ caption, children }) {
  return (
    <figure className="figure axw-figure">
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default AskExample;
