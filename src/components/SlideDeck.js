// Presentational slide shell shared by the IMPersona walkthrough (in a dialog)
// and the recipe slides (inline in the post). Controlled: the parent owns the
// index, so each host decides how keyboard navigation reaches it.

function SlideDeck({
  slides,
  index,
  onIndexChange,
  kicker,
  onClose,
  finalAction,
  titleId,
}) {
  const slide = slides[index];
  const Body = slide.Body;
  const last = index === slides.length - 1;

  return (
    <>
      <header className="pw-head">
        <span className="pw-kicker">
          {kicker} · {index + 1} / {slides.length}
        </span>
        {onClose && (
          <button
            type="button"
            className="pw-close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        )}
      </header>

      {/* keyed so each slide's animations restart when it is shown */}
      <div className="pw-slide" key={index}>
        <h3 className="pw-title" id={titleId}>
          {slide.title}
        </h3>
        <Body />
        <p className="pw-caption">{slide.caption}</p>
      </div>

      <footer className="pw-foot">
        <button
          type="button"
          className="pw-nav"
          onClick={() => onIndexChange(Math.max(index - 1, 0))}
          disabled={index === 0}
        >
          ← Back
        </button>
        <div className="pw-dots">
          {slides.map((s, j) => (
            <button
              key={s.title}
              type="button"
              className={`pw-dot${j === index ? ' pw-dot-on' : ''}`}
              aria-label={`Slide ${j + 1}`}
              aria-current={j === index}
              onClick={() => onIndexChange(j)}
            />
          ))}
        </div>
        {last && finalAction ? (
          finalAction
        ) : (
          <button
            type="button"
            className="pw-nav pw-nav-primary"
            onClick={() => onIndexChange(Math.min(index + 1, slides.length - 1))}
            disabled={last}
          >
            Next →
          </button>
        )}
      </footer>
    </>
  );
}

export default SlideDeck;
