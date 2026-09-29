import Walkthrough from './Walkthrough';

// Inline "how it worked" button that opens a short click-through of the
// IMPersona paper (arXiv:2504.04332): how the model was trained and how it
// was tested. The chat lines are illustrative, not real messages.

const PAPER_URL = 'https://arxiv.org/abs/2504.04332';

const HISTORY = [
  'omw, 5 min',
  'wait did you see the email',
  'lmaooo no way',
  'can we push to 7?',
  "ok ok i'm convinced",
  'send pics!!',
];

function SlideTraining() {
  // Doubled so the upward scroll can loop without a visible seam.
  const rows = [...HISTORY, ...HISTORY];
  return (
    <div className="pw-stage pw-sft">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Their messages</span>
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

      <div className="pw-panel pw-model">
        <span className="pw-panel-label">Supervised fine-tuning</span>
        <strong className="pw-model-name">Llama-3.1-8B-Instruct</strong>
        <div className="pw-bar">
          <i />
        </div>
        <svg className="pw-loss" viewBox="0 0 120 44" aria-hidden="true">
          <path pathLength="100" d="M2 6 C 22 10, 30 30, 50 33 S 90 38, 118 39" />
        </svg>
        <span className="pw-loss-label">training loss</span>
      </div>

      <span className="pw-flow" aria-hidden="true" />

      <div className="pw-panel pw-out" aria-hidden="true">
        <span className="pw-panel-label">Replying as them</span>
        <span className="pw-bubble pw-them">yo you free tonight?</span>
        <span className="pw-bubble pw-me pw-reply">
          <span className="pw-typing">
            <i />
            <i />
            <i />
          </span>
          <span className="pw-reply-text">haha yeah down, what time?</span>
        </span>
      </div>
    </div>
  );
}

function SlideTest() {
  return (
    <div className="pw-stage pw-test">
      <div className="pw-panel" aria-hidden="true">
        <span className="pw-panel-label">Someone who knows them</span>
        <span className="pw-bubble pw-them pw-ask">
          what'd you end up doing last night
        </span>
        <span className="pw-bubble pw-me pw-answer">
          honestly just stayed in lol
        </span>
      </div>

      <span className="pw-flow pw-flow-both" aria-hidden="true" />

      <div className="pw-curtain" aria-hidden="true">
        <span>?</span>
        <small>blind</small>
      </div>

      <span className="pw-flow pw-flow-both" aria-hidden="true" />

      <div className="pw-candidates">
        <div className="pw-cand pw-cand-a">
          <span className="pw-cand-dot" />
          The real person
        </div>
        <div className="pw-cand pw-cand-b">
          <span className="pw-cand-dot" />
          Their fine-tuned clone
        </div>
      </div>
    </div>
  );
}

const SLIDES = [
  {
    title: "Fine-tune a model on one person's messages",
    Body: SlideTraining,
    caption:
      "We supervised-fine-tune Llama-3.1-8B-Instruct on an individual's message history, and pair it with a hierarchical memory over that history, so that given a conversation it replies the way they would.",
  },
  {
    title: 'Ask the people who know them to tell them apart',
    Body: SlideTest,
    caption:
      'In blind conversations, people who know the individual chat with either the real person or the model, without knowing which, then guess whether they were talking to a human or an AI.',
  },
];

function PaperWalkthrough() {
  return (
    <Walkthrough
      slides={SLIDES}
      kicker="IMPersona"
      label="How IMPersona worked"
      finalAction={
        <a
          className="pw-nav pw-nav-primary"
          href={PAPER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the paper ↗
        </a>
      }
    />
  );
}

export default PaperWalkthrough;
