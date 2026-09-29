import { prefersReducedMotion } from './conversationPlayer';

// Inline figure for "Training a good assistant model": one flagged turn going
// through the preference-data pipeline. A judge flags
// the user model's private reaction as feedback, the reaction is translated
// into a guideline that only references what is observable in the
// conversation, the original assistant rewrites its reply, and the pair goes
// to DPO. The example is invented.

function AssistantFigure() {
  return (
    <figure
      className={`ev-figure${prefersReducedMotion() ? ' pw-static' : ''}`}
      aria-label="How a preference pair is built from the user model's reaction"
    >
      <div className="af-grid" aria-hidden="true">
        <div className="pw-panel af-panel">
          <span className="pw-panel-label">Rollout</span>
          <span className="pw-bubble pw-me">what do i do first</span>
          <span className="pw-bubble pw-them">
            Great question! Here's a 5-step plan for your week: 1. Block out…
          </span>
          <span className="pw-thought pw-disagree pw-reveal-1">
            way too much, i just need the first thing
          </span>
          <span className="pw-bubble pw-me pw-reveal-1">ok</span>
        </div>

        <span className="pw-flow" />

        <div className="pw-panel af-panel">
          <span className="pw-panel-label">Judge</span>
          <span className="ep-note">
            Is there meaningful feedback on the last reply?
          </span>
          <span className="dx-ok pw-reveal-1">✓ yes</span>
        </div>

        <span className="pw-flow" />

        <div className="pw-panel af-panel">
          <span className="pw-panel-label">Rewrite</span>
          <span className="af-guide pw-reveal-1">
            Ben asked what to do first. Lead with one concrete step and keep it
            short.
          </span>
          <span className="pw-bubble pw-them pw-reveal-2">
            The cover letter. It's the only thing due tonight.
          </span>
        </div>

        <span className="pw-flow" />

        <div className="pw-panel pw-pair af-panel">
          <span className="pw-panel-label">Preference pair → DPO</span>
          <div className="pw-pair-row pw-rejected">
            <span className="pw-pair-tag">rejected</span>
            <span className="pw-pair-text">Here's a 5-step plan for…</span>
          </div>
          <div className="pw-pair-row pw-chosen pw-reveal-2">
            <span className="pw-pair-tag">chosen</span>
            <span className="pw-pair-text">
              The cover letter. It's the only thing due tonight.
            </span>
          </div>
        </div>
      </div>
      <figcaption className="ev-caption">
        The user model only says "ok", but its private reaction is feedback.
        That reaction is turned into a guideline the assistant could have acted
        on from the conversation alone, and the original assistant rewrites its
        reply.
      </figcaption>
    </figure>
  );
}

export default AssistantFigure;
