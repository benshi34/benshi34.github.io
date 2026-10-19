// Browsers only allow autoplay when the video is muted.
function Video({ src, poster, caption, width, autoPlay = false }) {
  const style = width ? { maxWidth: width } : undefined;

  return (
    <figure className="figure figure-center" style={style}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={autoPlay}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Video;
