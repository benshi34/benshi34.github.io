// Table of contents for a post.
//
// Scrolls programmatically rather than using href="#id": the app runs on a
// HashRouter, so an anchor hash would overwrite the route and navigate away.

function Toc({ items }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="post-toc" aria-label="Contents">
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <button type="button" onClick={() => go(it.id)}>
              {it.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Toc;
