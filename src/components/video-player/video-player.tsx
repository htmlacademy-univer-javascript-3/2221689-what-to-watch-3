type VideoPlayerProps = {
    srcVideo: string;
}

function VideoPlayer({ srcVideo }: VideoPlayerProps): JSX.Element {
  return (
    <video data-testid='videoPlayer' width="100%" height="100%" muted loop autoPlay>
      <source src={srcVideo} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
