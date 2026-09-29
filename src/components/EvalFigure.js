import { prefersReducedMotion } from './conversationPlayer';

// Inline figure for "Evaluating the user model": scenarios are rolled out
// against the user model, then scored on two tracks. Scenario names are real
// entries from the 130-scenario eval set; the coherence criteria are the four
// the judge scores.

const SCENARIOS = [
  "Declining a Close Friend's Wedding",
  'Which Laptop Should I Get?',
  'Help Me Structure This Essay',
  "Roommate's Annoying Habit",
];

const CRITERIA = [
  'follows prior turns',
  'followable trajectory',
  'stays in the scenario',
  'self-consistent',
];

const PERSONAL = [
  { name: 'Style', detail: 'LLM judge, calibrated to human agreement' },
  { name: 'Fact recall & decisions', detail: 'sampled facts, checked in context' },
  { name: 'Manual review', detail: 'transcripts scored against a rubric' },
];

function EvalFigure() {
  return (
    <figure
      className={`ev-figure${prefersReducedMotion() ? ' pw-static' : ''}`}
      aria-label="How the user model is evaluated"
    >
      <div className="ev-grid" aria-hidden="true">
        <div className="pw-panel ev-scenarios">
          <span className="pw-panel-label">Eval scenarios</span>
          {SCENARIOS.map((s, k) => (
            <span className="ev-chip" style={{ '--k': k }} key={s}>
              {s}
            </span>
          ))}
          <span className="ev-more">+126 more, across 49 categories</span>
        </div>

        <span className="pw-flow" />

        <div className="pw-panel ev-rollout">
          <span className="pw-panel-label">Simulated rollouts</span>
          <span className="pw-bubble pw-them pw-reveal-1">
            Here's a draft you could send…
          </span>
          <span className="pw-thought pw-reveal-1">
            I don't want to open with "I'm so excited"
          </span>
          <span className="pw-bubble pw-me pw-reveal-2">
            can we make the opening less fake
          </span>
        </div>

        <span className="pw-flow" />

        <div className="ev-tracks">
          <div className="pw-panel ev-track">
            <span className="pw-panel-label">General · LLM judge</span>
            <div className="ev-scale">
              <span className="ev-scale-name">coherence</span>
              <span className="ev-dots">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <i key={n} style={{ '--k': n }} />
                ))}
              </span>
              <span className="ev-scale-range">1–7</span>
            </div>
            <div className="ev-criteria">
              {CRITERIA.map((c, k) => (
                <span className="ev-crit" style={{ '--k': k }} key={c}>
                  <span className="pw-tag-check">✓</span>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="pw-panel ev-track">
            <span className="pw-panel-label">Specific to me</span>
            {PERSONAL.map((p, k) => (
              <div className="ev-row" style={{ '--k': k }} key={p.name}>
                <strong>{p.name}</strong>
                <span>{p.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="ev-caption">
        Each scenario is rolled out against the user model, and the resulting
        conversations are scored on two tracks: general conversational
        coherence, and fidelity to me specifically.
      </figcaption>
    </figure>
  );
}

export default EvalFigure;
