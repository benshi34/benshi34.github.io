function Figure({ src, alt = '', caption, align = 'center', width, variant }) {
  const className = `figure figure-${align}${variant ? ` figure-${variant}` : ''}`;
  const style = width ? { maxWidth: width } : undefined;

  return (
    <figure className={className} style={style}>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Figure;
