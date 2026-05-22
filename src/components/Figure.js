function Figure({ src, alt = '', caption, align = 'center', width }) {
  const className = `figure figure-${align}`;
  const style = width ? { maxWidth: width } : undefined;

  return (
    <figure className={className} style={style}>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Figure;
