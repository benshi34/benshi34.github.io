import { useEffect, useRef, useState } from 'react';

// A BibTeX block with a copy button. Falls back to selecting the text when
// the async clipboard API is unavailable (e.g. over plain http).

function CiteBlock({ text }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flash = () => {
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  const fallback = () => {
    const range = document.createRange();
    range.selectNodeContents(codeRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
      if (document.execCommand('copy')) flash();
    } catch (e) {
      // leave the text selected so the reader can copy it by hand
    }
  };

  const copy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(flash, fallback);
    } else {
      fallback();
    }
  };

  return (
    <div className="post-cite">
      <button
        type="button"
        className={`post-cite-copy${copied ? ' post-cite-copied' : ''}`}
        onClick={copy}
        aria-label="Copy citation"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre>
        <code ref={codeRef}>{text}</code>
      </pre>
      <span className="visually-hidden" aria-live="polite">
        {copied ? 'Citation copied to clipboard' : ''}
      </span>
    </div>
  );
}

export default CiteBlock;
