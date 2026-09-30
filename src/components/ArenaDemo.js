import { useEffect, useRef, useState } from 'react';
import data from '../data/arena-demo.json';
import { createFollow, prefersReducedMotion } from './conversationPlayer';

// A replay of real battles from the blind arena, restyled after the real
// interface: two columns labelled only "Model A" and
// "Model B", every message sent to both, both replies streaming at once, then
// the vote. Replies are the models' verbatim outputs. Like the real arena,
// the UI never reveals which model is which; the caption does.

const BATTLES = data.battles.map((b) => ({
  ...b,
  turns: b.turns.map((t) => ({
    ...t,
    aWords: t.a.split(/(\s+)/),
    bWords: t.b.split(/(\s+)/),
  })),
}));

const REVEAL = {
  'Qwen 27B (vanilla)': 'the untrained assistant',
  'Qwen 27B + DPO': 'the trained assistant',
  'Qwen 397B + memory search': 'Qwen3.5-397B with memory search',
  'Qwen 27B + memory search': 'Qwen3.5-27B with memory search',
};
const PREF_LABEL = { a: 'A is better', b: 'B is better', tie: 'Tie', both_bad: 'Both bad' };
const BUTTONS = ['a', 'tie', 'b', 'both_bad'];

/* ---- just enough markdown for these replies ---- */

function inline(text, key) {
  const clean = text.replace(/\$([^$]+)\$/g, '$1').replace(/\\log/g, 'log');
  return clean.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2)
      return <em key={`${key}-${i}`}>{part.slice(1, -1)}</em>;
    return part.replace(/\*\*/g, '');
  });
}

function Markdown({ text }) {
  const blocks = [];
  let list = null;
  let table = null;
  text.split('\n').forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith('|')) {
      list = null;
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) return;
      if (!table) {
        table = [];
        blocks.push({ type: 'table', rows: table, key: i });
      }
      table.push(cells);
      return;
    }
    table = null;
    const bullet = line.match(/^[*-]\s+(.*)$/);
    if (bullet) {
      if (!list) {
        list = [];
        blocks.push({ type: 'ul', items: list, key: i });
      }
      list.push({ text: bullet[1], key: i });
      return;
    }
    list = null;
    const heading = line.match(/^#{1,4}\s+(.*)$/);
    if (heading) blocks.push({ type: 'h', text: heading[1], key: i });
    else if (line) blocks.push({ type: 'p', text: line, key: i });
  });
  return blocks.map((b) => {
    if (b.type === 'ul')
      return (
        <ul key={b.key}>
          {b.items.map((it) => (
            <li key={it.key}>{inline(it.text, it.key)}</li>
          ))}
        </ul>
      );
    if (b.type === 'table')
      return (
        <table key={b.key} className="ad-table">
          <tbody>
            {b.rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) => (ri === 0 ? <th key={ci}>{inline(c, `${b.key}-${ci}`)}</th> : <td key={ci}>{inline(c, `${b.key}-${ri}-${ci}`)}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    if (b.type === 'h')
      return (
        <p key={b.key} className="ad-heading">
          {inline(b.text, b.key)}
        </p>
      );
    return <p key={b.key}>{inline(b.text, b.key)}</p>;
  });
}

/* ---- replay ---- */

// shown: completed turns (with full replies) + the current turn's progress
const fresh = (battle) => ({ battle, turn: 0, typed: 0, sent: false, a: 0, b: 0, phase: 'typing' });
const finished = (battle) => {
  const last = BATTLES[battle].turns.length - 1;
  const t = BATTLES[battle].turns[last];
  return { battle, turn: last, typed: t.user.length, sent: true, a: t.aWords.length, b: t.bWords.length, phase: 'done' };
};

function ArenaDemo() {
  const reduced = prefersReducedMotion();
  const [s, setS] = useState(reduced ? finished(0) : fresh(0));
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef(null);
  const colA = useRef(null);
  const colB = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Play every battle in order: for each turn, type the message, send it and
  // stream both replies; after the last turn, vote; then "New Battle".
  useEffect(() => {
    if (reduced || !visible) return undefined;
    let cancelled = false;
    let timer;
    const wait = (ms) =>
      new Promise((r) => {
        timer = setTimeout(r, ms);
      });
    (async () => {
      for (let bi = 0; bi < BATTLES.length && !cancelled; bi += 1) {
        const battle = BATTLES[bi];
        setS(fresh(bi));
        await wait(600);
        for (let ti = 0; ti < battle.turns.length && !cancelled; ti += 1) {
          const turn = battle.turns[ti];
          setS((p) => ({ ...p, turn: ti, typed: 0, sent: false, a: 0, b: 0, phase: 'typing' }));
          await wait(ti === 0 ? 0 : 900);
          for (let i = 1; i <= turn.user.length && !cancelled; i += 1) {
            setS((p) => ({ ...p, typed: i }));
            await wait(24 + Math.random() * 36);
          }
          await wait(350);
          if (cancelled) return;
          setS((p) => ({ ...p, sent: true, phase: 'streaming' }));
          await wait(700);
          // long replies stream faster, so every reply lands within ~5s
          const stepA = Math.max(7, Math.ceil(turn.aWords.length / 95));
          const stepB = Math.max(7, Math.ceil(turn.bWords.length / 95));
          let a = 0;
          let b = 0;
          while (!cancelled && (a < turn.aWords.length || b < turn.bWords.length)) {
            a = Math.min(turn.aWords.length, a + stepA);
            b = Math.min(turn.bWords.length, b + stepB);
            const shownA = a;
            const shownB = b;
            setS((p) => ({ ...p, a: shownA, b: shownB }));
            await wait(50);
          }
          if (cancelled) return;
          setS((p) => ({ ...p, phase: 'idle' }));
          await wait(600);
        }
        if (cancelled) return;
        setS((p) => ({ ...p, phase: 'vote' }));
        await wait(1600);
        if (cancelled) return;
        setS((p) => ({ ...p, phase: 'picked' }));
        await wait(900);
        if (cancelled) return;
        setS((p) => ({ ...p, phase: 'done' }));
        await wait(bi === BATTLES.length - 1 ? 4500 : 2600);
        if (cancelled) return;
        if (bi < BATTLES.length - 1) {
          setS((p) => ({ ...p, phase: 'new' }));
          await wait(450);
        }
      }
      if (!cancelled) setCycle((c) => c + 1);
    })();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [visible, cycle, reduced]);

  // Keep each column pinned to the newest text while it streams, unless the
  // reader scrolls it; scrolling back to the bottom resumes.
  // The columns are re-created for each battle, so attach to the new ones.
  const follow = useRef({});
  useEffect(() => {
    const a = colA.current && createFollow(colA.current);
    const b = colB.current && createFollow(colB.current);
    follow.current = { a, b };
    return () => {
      if (a) a.dispose();
      if (b) b.dispose();
    };
  }, [s.battle]);

  useEffect(() => {
    if (s.phase !== 'streaming' && !s.sent) return;
    Object.values(follow.current).forEach((f) => f && f.toBottom());
  }, [s.a, s.b, s.sent, s.phase, s.turn]);

  const battle = BATTLES[s.battle];

  const column = (side, ref) => (
    <div className="ad-col">
      <div className="ad-colhead">
        <span className="ad-model">Model {side.toUpperCase()}</span>
        <span className={`ad-badge ad-badge-${side}`}>{side}</span>
      </div>
      <div className="ad-messages" ref={ref}>
        {battle.turns.slice(0, s.turn + 1).map((t, ti) => {
          const current = ti === s.turn;
          if (current && !s.sent) return null;
          const words = side === 'a' ? t.aWords : t.bWords;
          const shown = current ? s[side] : words.length;
          const streaming = current && s.phase === 'streaming' && shown < words.length;
          return (
            <div key={ti} className="ad-turn">
              <div className="ad-msg ad-user">
                <div className="ad-bubble">{t.user}</div>
              </div>
              <div className={`ad-msg ad-assistant${streaming ? ' ad-streaming' : ''}`}>
                <div className="ad-bubble">
                  {shown === 0 ? (
                    <span className="ad-dots">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <Markdown text={words.slice(0, shown).join('')} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const voting = s.phase === 'vote' || s.phase === 'picked';
  const done = s.phase === 'done' || s.phase === 'new';
  const turn = battle.turns[s.turn];
  const typing = !s.sent && s.typed > 0;

  const who = (side) => REVEAL[battle.models[side]] || battle.models[side];

  return (
    <figure className="ad-figure" ref={rootRef} aria-label="Replay of blind arena battles">
      <div className="ad-top" aria-hidden="true">
        Battle {s.battle + 1} of {BATTLES.length}
      </div>
      <div className="ad-frame" aria-hidden="true">
        <div className="ad-columns" key={s.battle}>
          {column('a', colA)}
          {column('b', colB)}
        </div>

        {voting && (
          <div className="ad-bar ad-pref">
            <div className="ad-pref-label">Which response do you prefer?</div>
            <div className="ad-pref-buttons">
              {BUTTONS.map((k) => (
                <span
                  key={k}
                  className={`ad-pref-btn${
                    s.phase === 'picked' && k === battle.preference ? ' ad-selected' : ''
                  }${k === 'both_bad' ? ' ad-dim' : ''}`}
                >
                  {PREF_LABEL[k]}
                </span>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className="ad-bar ad-done">
            <span>Preference recorded — thank you!</span>
            <span className={`ad-new${s.phase === 'new' ? ' ad-new-pressed' : ''}`}>New Battle</span>
          </div>
        )}

        {!voting && !done && (
          <div className="ad-bar">
            <div className="ad-input">
              <span className={typing ? '' : 'ad-placeholder'}>
                {typing
                  ? turn.user.slice(0, s.typed)
                  : s.turn === 0 && !s.sent
                  ? 'Send a message to start a battle...'
                  : 'Continue the conversation...'}
                {typing && <span className="ad-caret" />}
              </span>
              <span className="ad-send">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>

      <figcaption className="ev-caption">
        Replays of real battles from the arena; every reply is the model's
        actual output, and the arena never shows which model is which. In this
        battle, Model A was {who('a')} and Model B was {who('b')}, and I voted
        for {battle.preference === 'tie' ? 'neither (a tie)' : battle.preference.toUpperCase()}.
      </figcaption>
    </figure>
  );
}

export default ArenaDemo;
