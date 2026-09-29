import { useEffect, useId, useRef, useState } from 'react';

// A small inline "i" button that shows a definition bubble on hover or
// keyboard focus, and toggles on tap for touch screens. Esc or a tap
// elsewhere closes it. The bubble is centred on the button, then nudged
// sideways if that would push it past the edge of the screen.

function InfoTip({ label, children }) {
  const [pinned, setPinned] = useState(false);
  const ref = useRef(null);
  const bubbleRef = useRef(null);
  const id = useId();

  const keepOnScreen = () => {
    const bubble = bubbleRef.current;
    if (!bubble) return;
    bubble.style.setProperty('--infotip-shift', '0px');
    const { left, right } = bubble.getBoundingClientRect();
    const margin = 8;
    let shift = 0;
    if (left < margin) shift = margin - left;
    else if (right > window.innerWidth - margin)
      shift = window.innerWidth - margin - right;
    bubble.style.setProperty('--infotip-shift', `${shift}px`);
  };

  useEffect(() => {
    if (!pinned) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setPinned(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setPinned(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [pinned]);

  return (
    <span
      className={`infotip${pinned ? ' infotip-open' : ''}`}
      ref={ref}
      onMouseEnter={keepOnScreen}
      onFocus={keepOnScreen}
    >
      <button
        type="button"
        className="infotip-btn"
        aria-label={label}
        aria-describedby={id}
        aria-expanded={pinned}
        onClick={() => {
          keepOnScreen();
          setPinned((v) => !v);
        }}
      >
        i
      </button>
      <span
        className="infotip-bubble"
        role="tooltip"
        id={id}
        ref={bubbleRef}
      >
        {children}
      </span>
    </span>
  );
}

export default InfoTip;
