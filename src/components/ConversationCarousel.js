import { useEffect, useRef, useState } from 'react';
import examples from '../data/user-model-examples.json';
import {
  createPlayer,
  prefersReducedMotion,
  prepareMessages,
} from './conversationPlayer';

// A carousel of real eval conversations from the final user model, animated
// the same way as the opening theater. Animation only runs while the carousel
// is on screen.

function ConversationCarousel({ group, kicker }) {
  const items = examples.filter((e) => e.group === group);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(prefersReducedMotion());
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const logRef = useRef(null);

  const item = items[index];

  useEffect(() => {
    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return undefined;
    // Show the user model's full reasoning: here it is the point.
    const player = createPlayer(log, { clipThink: Infinity });
    const messages = prepareMessages(item.messages);
    if (showAll) {
      player.renderAll(messages);
    } else if (visible) {
      player.loop(messages);
    }
    return () => player.cancel();
  }, [item, showAll, visible]);

  const go = (i) => setIndex((i + items.length) % items.length);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1);
    else if (e.key === 'ArrowLeft') go(index - 1);
  };

  return (
    <div
      ref={rootRef}
      className="cc-card"
      role="region"
      aria-roledescription="carousel"
      aria-label={kicker}
      onKeyDown={onKeyDown}
    >
      <header className="cc-head">
        <span className="pw-kicker">
          {kicker} · {index + 1} / {items.length}
        </span>
      </header>

      <div className="cc-body" key={item.id}>
        <h4 className="cc-title">{item.title}</h4>
        <p className="cc-note">{item.note}</p>
        <div className="imp-col-log cc-log" ref={logRef} />
      </div>

      <footer className="pw-foot cc-foot">
        <button type="button" className="pw-nav" onClick={() => go(index - 1)}>
          ← Prev
        </button>
        <div className="pw-dots">
          {items.map((it, j) => (
            <button
              key={it.id}
              type="button"
              className={`pw-dot${j === index ? ' pw-dot-on' : ''}`}
              aria-label={`Example ${j + 1}: ${it.title}`}
              aria-current={j === index}
              onClick={() => setIndex(j)}
            />
          ))}
        </div>
        <div className="cc-actions">
          <button
            type="button"
            className="pw-nav"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Replay' : 'Show all'}
          </button>
          <button
            type="button"
            className="pw-nav pw-nav-primary"
            onClick={() => go(index + 1)}
          >
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}

export default ConversationCarousel;
