import { useState } from 'react';
import examples from '../data/before-after.json';
import { clip, stripMd } from './conversationPlayer';

// The same moment in a conversation, answered by the untrained assistant and
// by the assistant after one round of training. From the round-1 evaluation,
// where the untrained model was re-run on the trained model's conversation
// histories so both reply to identical context.

function Side({ label, reply, tone }) {
  return (
    <div className={`pw-panel ba-side ba-${tone}`}>
      <span className="pw-panel-label">{label}</span>
      <div className="ba-reply">{stripMd(reply)}</div>
    </div>
  );
}

function BeforeAfter() {
  const [index, setIndex] = useState(0);
  const ex = examples[index];

  return (
    <figure className="ev-figure ba-figure" aria-label="Before and after training">
      <div className="ba-tabs" role="tablist">
        {examples.map((e, j) => (
          <button
            key={e.label}
            type="button"
            role="tab"
            aria-selected={j === index}
            className={`ba-tab${j === index ? ' ba-tab-on' : ''}`}
            onClick={() => setIndex(j)}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="ba-context" key={`ctx-${index}`}>
        {ex.context.map((m, k) => (
          <span
            key={k}
            className={`pw-bubble ${m.role === 'user' ? 'pw-me' : 'pw-them'}`}
          >
            {m.role === 'user' ? m.text : clip(stripMd(m.text), 170)}
          </span>
        ))}
      </div>

      <div className="pw-stage dx-two dx-nogap" key={index}>
        <Side label="Before training" reply={ex.before.reply} tone="before" />
        <Side label="After training" reply={ex.after.reply} tone="after" />
      </div>

      <figcaption className="ev-caption">
        The same moment in a conversation, answered by the assistant before and
        after training.
      </figcaption>
    </figure>
  );
}

export default BeforeAfter;
