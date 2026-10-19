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

// **bold** and [label](record:ROWID) citations, which the app draws as chips.
function inline(text) {
  const parts = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(record:\d+\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(m[1] !== undefined
      ? <strong key={m.index}>{inline(m[1])}</strong>
      : <span key={m.index} className="axw-cite">{m[2]}</span>);
    last = re.lastIndex;
  }
  parts.push(text.slice(last));
  return parts;
}

// The Markdown Ask answers are written in: paragraphs and "- " bullets.
function Answer({ markdown }) {
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
  return blocks.map((b, i) => (Array.isArray(b)
    ? <ul key={i}>{b.map((li, j) => <li key={j}>{inline(li)}</li>)}</ul>
    : <p key={i}>{inline(b)}</p>));
}

// As tall as the answer needs, and never shorter than the screenshots.
export function AskWindow({ question, lookedUp, answer }) {
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
          <Answer markdown={answer} />
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
