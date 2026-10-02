import { useEffect, useRef } from 'react';
import conversations from '../data/impersona-conversations.json';
import {
  clip,
  createPlayer,
  prefersReducedMotion,
  prepareMessages,
  SIGNAL_TAG,
  stripMd,
  thoughtPieces,
} from './conversationPlayer';

const HERO_PLAYER = { signals: true, clipThink: 90, thinkWordMs: 34 };

export function Quote({ quote }) {
  return (
    <div className="imp-quote">
      <span className="imp-quote-who">
        {quote.role === 'user' ? 'Ben' : 'AI Assistant'}
      </span>
      <span className="imp-quote-text">{clip(stripMd(quote.text), 120)}</span>
    </div>
  );
}

// Reduced-motion fallback: the opening exchange, rendered once, no animation.
function StaticColumn({ convo }) {
  const prepared = prepareMessages(convo.messages);
  const opening = prepared.slice(0, 4);

  return (
    <div className="imp-col-log">
      {opening.map((m, i) =>
        m.role === 'user' ? (
          <div key={i}>
            {m.think && (
              <div className="imp-think">
                <span className="imp-think-label">thinking</span>
                <span className="imp-think-body">
                  {thoughtPieces(m.think, m.signal, HERO_PLAYER.clipThink).map((p, k) =>
                    p.signal ? (
                      <mark className="imp-signal" key={k}>
                        {p.text}
                      </mark>
                    ) : (
                      p.text
                    )
                  )}
                </span>
                {m.signal && <span className="imp-signal-tag">{SIGNAL_TAG}</span>}
              </div>
            )}
            {m.quote && <Quote quote={m.quote} />}
            <div className="imp-msg imp-user">
              <span className="imp-body">{m.text}</span>
            </div>
          </div>
        ) : (
          <div className="imp-msg imp-ai" key={i}>
            <span className="imp-body">{clip(stripMd(m.text), 260)}</span>
          </div>
        )
      )}
    </div>
  );
}

function Column({ convo, animate }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (!animate || !logRef.current) return undefined;
    const player = createPlayer(logRef.current, HERO_PLAYER);
    // Stagger the columns so they don't move in lockstep.
    player.loop(prepareMessages(convo.messages), Math.random() * 1400);
    return () => player.cancel();
  }, [convo, animate]);

  return (
    <div className="imp-col">
      <div className="imp-col-head">
        <span className="imp-col-title">{convo.title}</span>
      </div>
      {animate ? (
        <div className="imp-col-log" ref={logRef} />
      ) : (
        <StaticColumn convo={convo} />
      )}
    </div>
  );
}

function ConversationTheater({ count = 3, caption }) {
  const animate = !prefersReducedMotion();
  const shown = conversations.slice(0, count);

  return (
    <div className="imp-theater-wrap">
      <div className="imp-hero">
        {shown.map((convo) => (
          <Column key={convo.id} convo={convo} animate={animate} />
        ))}
      </div>
      {caption && <p className="imp-caption">{caption}</p>}
    </div>
  );
}

export default ConversationTheater;
