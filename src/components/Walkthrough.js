import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { prefersReducedMotion } from './conversationPlayer';
import SlideDeck from './SlideDeck';

// Inline play button that opens a short click-through in a dialog. Used for
// the IMPersona paper walkthrough, the data-pipeline examples and the eval
// deep dive. The button pulses until the reader has reached the last slide,
// then turns grey; it stays clickable. Seen state is remembered per kicker.

const seenKey = (kicker) => `walkthrough-seen:${kicker}`;

function readSeen(kicker) {
  try {
    return window.localStorage.getItem(seenKey(kicker)) === '1';
  } catch (e) {
    return false;
  }
}

function Walkthrough({ slides, kicker, label, finalAction }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(() => readSeen(kicker));
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIndex((v) => Math.min(v + 1, slides.length - 1)),
    [slides.length]
  );
  const prev = useCallback(() => setIndex((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    if (!open || seen || index !== slides.length - 1) return;
    setSeen(true);
    try {
      window.localStorage.setItem(seenKey(kicker), '1');
    } catch (e) {
      // storage unavailable (private mode): grey for this visit only
    }
  }, [open, seen, index, slides.length, kicker]);

  useEffect(() => {
    if (!open) return undefined;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (dialogRef.current) dialogRef.current.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      if (trigger) trigger.focus();
    };
  }, [open, close, next, prev]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`pw-trigger ${seen ? 'pw-trigger-seen' : 'pw-trigger-new'}`}
        aria-haspopup="dialog"
        aria-label={label}
        title={label}
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
      >
        {/* centroid-centred triangle, so it sits optically in the circle */}
        <svg viewBox="0 0 10 10" aria-hidden="true">
          <path d="M3 1.5 L9 5 L3 8.5 Z" fill="currentColor" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            className="pw-overlay"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div
              ref={dialogRef}
              className={`pw-dialog${prefersReducedMotion() ? ' pw-static' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
            >
              <SlideDeck
                slides={slides}
                index={index}
                onIndexChange={setIndex}
                kicker={kicker}
                onClose={close}
                titleId={titleId}
                finalAction={
                  finalAction || (
                    <button
                      type="button"
                      className="pw-nav pw-nav-primary"
                      onClick={close}
                    >
                      Done
                    </button>
                  )
                }
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Walkthrough;
