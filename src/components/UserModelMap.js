import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './conversationPlayer';

// Conceptual figure for the conclusion: use cases on a sliding scale of how
// much individual-level data they need. The further left, the more of the
// model can come from a population-level prior. Not data; the placements are
// illustrative. A knob sweeps the scale while the blend bar above shows the
// population / individual mix at that point.

const USES = [
  { text: 'filing tax forms', x: 5 },
  { text: 'renewing a passport', x: 17 },
  { text: 'ordering groceries', x: 31 },
  { text: 'booking travel', x: 44 },
  { text: 'picking a restaurant', x: 57 },
  { text: 'replying to messages on your behalf', x: 70 },
  { text: 'working through a conflict with a friend', x: 83 },
  { text: 'therapy and emotional support', x: 95 },
];

function useInView(ref) {
  const [live, setLive] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );
  useEffect(() => {
    if (live || !ref.current) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [live, ref]);
  return live;
}

function Scale() {
  return (
    <div className="sl-wide" aria-hidden="true">
      <div className="sl-blend-labels">
        <span>population prior</span>
        <span className="sl-blue">individual data</span>
      </div>
      <div className="sl-blend">
        <span className="sl-pop" />
        <span className="sl-ind" />
      </div>

      <div className="sl-track-area">
        <span className="sl-track" />
        <span className="sl-knob" />
        {USES.map((u, k) => (
          <span
            className={`sl-use ${k % 2 ? 'sl-below' : 'sl-above'}${
              u.x < 10 ? ' sl-edge-l' : ''
            }${u.x > 90 ? ' sl-edge-r' : ''}`}
            style={{ left: `${u.x}%`, '--k': k }}
            key={u.text}
          >
            <i className="sl-dot" />
            <span className="sl-label">{u.text}</span>
          </span>
        ))}
      </div>

      <div className="sl-axis">
        <span>individual data needed: little</span>
        <span>lots</span>
      </div>
    </div>
  );
}

function Rows() {
  return (
    <div className="sl-narrow">
      <div className="sl-blend-labels">
        <span>population prior</span>
        <span className="sl-blue">individual data</span>
      </div>
      {USES.map((u) => (
        <div className="sl-row" key={u.text}>
          <span className="sl-row-text">{u.text}</span>
          <span className="sl-mini" aria-hidden="true">
            <span className="sl-pop" />
            <span className="sl-ind" style={{ width: `${u.x}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

function UserModelMap() {
  const ref = useRef(null);
  const live = useInView(ref);

  return (
    <figure
      ref={ref}
      className={`ev-figure sl-figure${live ? ' sl-live' : ''}${
        prefersReducedMotion() ? ' pw-static' : ''
      }`}
      aria-label="Use cases on a sliding scale of how much individual-level data they need"
    >
      <Scale />
      <Rows />
      <figcaption className="ev-caption">
        Use cases on a sliding scale of how much individual-level data they
        need. The further left, the more of the model can come from a
        population-level prior; the further right, the more it has to learn
        about the specific person.
      </figcaption>
    </figure>
  );
}

export default UserModelMap;
