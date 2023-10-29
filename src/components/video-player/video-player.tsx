type VideoPlayerProps = {
    srcVideo: string;
}

function VideoPlayer({ srcVideo }: VideoPlayerProps): JSX.Element {
  return (
    <video width="280" height="175" muted autoPlay>
      <source src={srcVideo} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
