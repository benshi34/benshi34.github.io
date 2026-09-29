import { useState } from 'react';
import { prefersReducedMotion } from './conversationPlayer';
import SlideDeck from './SlideDeck';

// The two-step recipe, as inline slides. Visual language matches the IMPersona
// walkthrough. Chat lines are illustrative; model names and the chosen/rejected
// construction follow the actual pipeline.

const HISTORY = [
  'omw, 5 min',
  'wait did you see the email',
  'lmaooo no way',
  'can we push to 7?',
  "ok ok i'm convinced",
  'send pics!!',
];

const ANNOTATIONS = [
  'relationship summary',
  'what came before',
  'reconstructed thoughts',
];

function StepUserModel() {
  const rows = [...HISTORY, ...HISTORY];
  return (
    <div className="pw-stage">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">My iMessage history</span>
        <div className="pw-history-window">
          <div className="pw-history-track">
            {rows.map((t, k) => (
              <span className="pw-bubble pw-me" key={k}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel pw-annotate" aria-hidden="true">
        <span className="pw-panel-label">Annotate each conversation</span>
        {ANNOTATIONS.map((t, k) => (
          <span className="pw-tag" style={{ '--k': k }} key={t}>
            <span className="pw-tag-check">✓</span>
            {t}
          </span>
        ))}
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel pw-model pw-model-left" aria-hidden="true">
        <span className="pw-panel-label">User model</span>
        <strong className="pw-model-name">Llama-3.1-8B + LoRA</strong>
        <span className="pw-thought pw-reveal-1">
          they want one answer, not a list
        </span>
        <span className="pw-bubble pw-me pw-reveal-2">can u just pick one</span>
      </div>
    </div>
  );
}

function StepAssistant() {
  return (
    <div className="pw-stage">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">A rollout</span>
        <span className="pw-bubble pw-them">
          Here are 3 destinations you might like: 1. Kyoto…
        </span>
        <span className="pw-thought pw-disagree pw-reveal-1">
          I asked it to pick, not to give me a menu
        </span>
        <span className="pw-bubble pw-me pw-reveal-2">I want you to pick</span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel pw-pair" aria-hidden="true">
        <span className="pw-panel-label">Preference pair</span>
        <div className="pw-pair-row pw-rejected">
          <span className="pw-pair-tag">rejected</span>
          <span className="pw-pair-text">
            Here are 3 destinations you might like…
          </span>
        </div>
        <div className="pw-pair-row pw-chosen pw-reveal-2">
          <span className="pw-pair-tag">chosen</span>
          <span className="pw-pair-text">Kyoto. Go in early April.</span>
        </div>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel pw-model" aria-hidden="true">
        <span className="pw-panel-label">Preference optimisation</span>
        <strong className="pw-model-name">Qwen3.5-27B · DPO</strong>
        <div className="pw-bar">
          <i />
        </div>
        <svg className="pw-loss" viewBox="0 0 120 44" aria-hidden="true">
          <path
            pathLength="100"
            d="M2 6 C 22 10, 30 30, 50 33 S 90 38, 118 39"
          />
        </svg>
        <span className="pw-loss-label">train loss</span>
      </div>
    </div>
  );
}

const STEPS = [
  {
    title: 'Train a user model of me',
    Body: StepUserModel,
    caption:
      'We fine-tune a language model on my message history. Each conversation is annotated with a summary of my relationship with that contact, what was going on beforehand, and a reconstructed internal monologue, so the model learns to think before it replies.',
  },
  {
    title: 'Train an assistant through interaction with it',
    Body: StepAssistant,
    caption:
      "The assistant talks to my user model across tens of thousands of rollouts. We use the user model's internal monologue as the reward signal: its private reactions to each reply are turned into preference pairs, which the assistant is then trained on.",
  },
];

function AlgorithmSlides() {
  const [index, setIndex] = useState(0);

  // Arrow keys only once the reader is interacting with the deck, so the
  // page's own keyboard scrolling is left alone.
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') setIndex((v) => Math.min(v + 1, STEPS.length - 1));
    else if (e.key === 'ArrowLeft') setIndex((v) => Math.max(v - 1, 0));
  };

  return (
    <div
      className={`pw-deck${prefersReducedMotion() ? ' pw-static' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="The two training steps"
      onKeyDown={onKeyDown}
    >
      <SlideDeck
        slides={STEPS}
        index={index}
        onIndexChange={setIndex}
        kicker="The recipe"
        finalAction={
          <button
            type="button"
            className="pw-nav pw-nav-primary"
            onClick={() => setIndex(0)}
          >
            ↺ Start over
          </button>
        }
      />
    </div>
  );
}

export default AlgorithmSlides;
