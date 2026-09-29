import Walkthrough from './Walkthrough';

// Play-button deep dive into a problem with the coherence eval: it has to be
// grounded in the person's style of expression. The conversations are
// invented (no real messages are published) but follow patterns seen in the
// rollouts. The register rules are the ones written into the coherence
// judge's prompt.

/* ---- coherence depends on the person ---- */

function Burst() {
  return (
    <>
      <span className="pw-bubble pw-them">
        Want me to compare the two apartments side by side?
      </span>
      <span className="pw-bubble pw-me">wait</span>
      <span className="pw-bubble pw-me">ok so</span>
      <span className="pw-bubble pw-me">the cheaper one is kinda far</span>
      <span className="pw-bubble pw-me">nvm</span>
      <span className="pw-bubble pw-me">the one by the gym</span>
      <span className="pw-bubble pw-me">bc i'd actually go lol</span>
    </>
  );
}

function GenericJudge() {
  return (
    <div className="pw-stage dx-two dx-nogap">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Conversation</span>
        <Burst />
      </div>
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Generic judge</span>
        <span className="ep-note pw-reveal-1">
          Six messages for one answer. Two trail off, and "nvm" reverses the
          previous message.
        </span>
        <span className="dx-flag ep-verdict pw-reveal-2">
          ✗ fragmented, self-contradicting · 3/7
        </span>
      </div>
    </div>
  );
}

function CalibratedJudge() {
  return (
    <div className="pw-stage dx-two dx-nogap">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Conversation</span>
        <Burst />
      </div>
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Judge, told what is register</span>
        <div className="ep-rules pw-reveal-1">
          <span className="ep-rule">short messages</span>
          <span className="ep-rule">typos</span>
          <span className="ep-rule">slang</span>
          <span className="ep-rule">fragments</span>
          <span className="ep-rule">stream of consciousness</span>
        </div>
        <span className="ep-note pw-reveal-1">
          All fine. Grade whether the thread can be followed.
        </span>
        <span className="dx-ok ep-verdict pw-reveal-2">
          ✓ one decision, reached out loud · 6/7
        </span>
      </div>
    </div>
  );
}

const SLIDES = [
  {
    title: 'Coherence depends on the person',
    Body: GenericJudge,
    caption:
      'People communicate very differently, so coherence has to be grounded in an individual\'s style of expression. This is how I answer a question over text: a burst of short messages, thinking out loud, changing my mind halfway. Read by a generic judge, it looks like a model losing the thread. (Illustrative example.)',
  },
  {
    title: 'So we normalize for how the person writes',
    Body: CalibratedJudge,
    caption:
      'The coherence judge is told that short messages, typos, slang, fragments and stream of consciousness are all fine, and grades only whether a reader can follow what the person means and why. The same thread now reads as what it is. (Illustrative example.)',
  },
];

export default function CoherenceProblemsWalkthrough() {
  return (
    <Walkthrough
      slides={SLIDES}
      kicker="Coherence depends on the person"
      label="Deep dive: coherence depends on the person"
    />
  );
}
