import Walkthrough from './Walkthrough';

// Play-button walkthroughs for the two data interventions in the user-model
// section. The examples are invented (no real messages are published), but
// they follow the real training format: the system prompt carries
// "You are talking to …", "Relationship context: …" and "Context: …", and the
// target is a <think> block followed by the reply, with <msg> between
// messages. [SKIP]-flagged examples are removed by the dataset's quality
// gate.

function CtxCard({ name, relationship, context }) {
  return (
    <div className="dx-ctx">
      <div className="dx-ctx-row pw-reveal-1">
        <span className="dx-ctx-key">Talking to</span>
        {name}
      </div>
      <div className="dx-ctx-row pw-reveal-1">
        <span className="dx-ctx-key">Relationship</span>
        {relationship}
      </div>
      {context && (
        <div className="dx-ctx-row pw-reveal-1">
          <span className="dx-ctx-key">Context</span>
          {context}
        </div>
      )}
    </div>
  );
}

/* ---- relationship & situational context ---- */

function ContextWithWithout() {
  return (
    <div className="pw-stage dx-two">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Transcript only</span>
        <span className="pw-bubble pw-them">wait how'd it go??</span>
        <span className="pw-bubble pw-me">
          so much better than last time, she actually laughed at my joke
        </span>
        <span className="dx-flag">? go how, and who is "she"</span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Conditioned on context</span>
        <CtxCard
          name="Maya"
          relationship="Close friend from college; talk most days, mostly banter."
          context="Ben had a second date last night, and Maya knew it was happening."
        />
        <span className="pw-bubble pw-them">wait how'd it go??</span>
        <span className="pw-bubble pw-me pw-reveal-2">
          so much better than last time, she actually laughed at my joke
        </span>
        <span className="dx-ok pw-reveal-2">✓ now follows from the input</span>
      </div>
    </div>
  );
}

function ContextByPerson() {
  return (
    <div className="pw-stage dx-two dx-nogap">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Close friend</span>
        <CtxCard
          name="Maya"
          relationship="Close friend from college; talk most days, mostly banter."
        />
        <span className="pw-bubble pw-them">how did the interview go?</span>
        <span className="pw-bubble pw-me pw-reveal-2">
          LMAOOO i blanked on the first question but recovered, i think it went
          ok??
        </span>
      </div>

      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Research mentor</span>
        <CtxCard
          name="Dr. Lee"
          relationship="Research advisor; formal but warm, mostly about work."
        />
        <span className="pw-bubble pw-them">how did the interview go?</span>
        <span className="pw-bubble pw-me pw-reveal-2">
          It went well, thank you! I'll let you know when I hear back.
        </span>
      </div>
    </div>
  );
}

const CONTEXT_SLIDES = [
  {
    title: 'The reply depends on something the transcript never says',
    Body: ContextWithWithout,
    caption:
      'Trained on transcripts alone, a model sees replies that seem to come from nowhere and learns to make jumps like them. Conditioning each example on the relationship and on what was true beforehand makes the reply follow from the input. (Illustrative example.)',
  },
  {
    title: 'The same question, a different person',
    Body: ContextByPerson,
    caption:
      'Because every example carries a relationship summary, the model learns how tone, disclosure and register shift with the person on the other end. (Illustrative example.)',
  },
];

export function ContextWalkthrough() {
  return (
    <Walkthrough
      slides={CONTEXT_SLIDES}
      kicker="Relationship context"
      label="Example: relationship and situational context"
    />
  );
}

/* ---- reconstructed internal reasoning ---- */

function ReasoningRecover() {
  return (
    <div className="pw-stage dx-wide-last">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Transcript</span>
        <span className="pw-bubble pw-them">want to grab ramen tonight?</span>
        <span className="pw-bubble pw-me">ahh i'm kinda wiped</span>
        <span className="pw-bubble pw-me">rain check this weekend?</span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel dx-annot" aria-hidden="true">
        <span className="pw-panel-label">Annotator reconstructs</span>
        <span className="pw-thought pw-reveal-1">
          Long day and genuinely tired, but I don't want Jordan to think I'm not
          interested, so I'll offer another time.
        </span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Training target</span>
        <code className="dx-target pw-reveal-2">
          <span className="dx-tag">&lt;think&gt;</span>
          <span className="dx-think">Long day and genuinely tired, but…</span>
          <span className="dx-tag">&lt;/think&gt;</span>
          {'\n'}
          ahh i'm kinda wiped<span className="dx-tag">&lt;msg&gt;</span>rain
          check this weekend?
        </code>
      </div>
    </div>
  );
}

function ReasoningSkip() {
  return (
    <div className="pw-stage">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Transcript</span>
        <span className="pw-bubble pw-them">lol classic</span>
        <span className="pw-bubble pw-me">
          yeah exactly what happened with jake
        </span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel dx-annot" aria-hidden="true">
        <span className="pw-panel-label">Annotator</span>
        <div className="dx-skip pw-reveal-1">
          <strong>[SKIP]</strong>
          References an event outside this conversation; the reasoning can't be
          reconstructed without inventing it.
        </div>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel dx-dropped" aria-hidden="true">
        <span className="pw-panel-label">Dataset</span>
        <span className="dx-dropped-mark pw-reveal-2">Example removed</span>
      </div>
    </div>
  );
}

const REASONING_SLIDES = [
  {
    title: 'Recover the thought behind each reply',
    Body: ReasoningRecover,
    caption:
      'For every real reply, an annotator model writes a short monologue of what I likely noticed, felt, or intended. The user model is trained to produce that monologue as a <think> block, then the message itself. (Illustrative example.)',
  },
  {
    title: 'Abstain when it would have to guess',
    Body: ReasoningSkip,
    caption:
      'When a reply depends on something that is not in the conversation or its context, the annotator declines to reconstruct a motive, and the example is removed from training rather than kept with a fabricated one. (Illustrative example.)',
  },
];

export function ReasoningWalkthrough() {
  return (
    <Walkthrough
      slides={REASONING_SLIDES}
      kicker="Reconstructed reasoning"
      label="Example: reconstructed internal reasoning"
    />
  );
}
