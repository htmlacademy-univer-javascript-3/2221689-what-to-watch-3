import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchFilm } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilm, getFilmFetchingStatus } from '../../store/film-data/selectors';
import getLeftTime from '../../utils/get-left-time';
import { APIRoute, RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';
import { ErrorLoad } from '../../components/error-load/error-load';


function PlayerPage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const film = useAppSelector(getFilm);
  const fetchingStatusFilm = useAppSelector(getFilmFetchingStatus);
  const dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoad, setIsLoad] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const durationFilm = videoRef.current?.duration as number;

  function handlePlayClick() {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleFullScreenClick() {
    if (!isFullScreen) {
      videoRef.current?.requestFullscreen({ navigationUI: 'hide' }).then(() => setIsFullScreen(!isFullScreen));
    } else {
      document.exitFullscreen();
      setIsFullScreen(!isFullScreen);
    }
  }

  function handleTimeUpdate() {
    if (
      progressRef.current &&
      film &&
      videoRef.current &&
      togglerRef.current &&
      timeRef.current
    ) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      progressRef.current.value = progress;
      togglerRef.current.style.left = `${progress}%`;
      timeRef.current.innerHTML = getLeftTime(videoRef.current.duration - videoRef.current.currentTime);
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (id) {
        dispatch(fetchFilm({ filmId: id }));
      }
    }

    return () => {
      isMounted = false;
    };

  }, [id, dispatch]);

  return (
    <>
      {fetchingStatusFilm === RequestStatus.Success &&
      <>
        <Helmet>
          <title>Watch a movie</title>
        </Helmet>
        <div className="player">
          <video data-testid="video" className="player__video" poster={film.backgroundImage} ref={videoRef} onLoadedMetadata={() => setIsLoad(false)} onTimeUpdate={handleTimeUpdate} autoPlay muted>
            <source src={film.videoLink} type="video/mp4" />
          </video>
          {!isLoad ?
            <>
              <button type="button" className="player__exit" onClick={() => navigate(`${APIRoute.Films}/${film.id}`)}>Exit</button>
              <div className="player__controls">
                <div className="player__controls-row">
                  <div className="player__time">
                    <progress className="player__progress" value="0" max="100" ref={progressRef}></progress>
                    <div className="player__toggler" ref={togglerRef}>Toggler</div>
                  </div>
                  <div className="player__time-value" ref={timeRef}>{getLeftTime(durationFilm)}</div>
                </div>
                <div className="player__controls-row">
                  <button type="button" className="player__play" onClick={handlePlayClick}>
                    {isPlaying ?
                      <>
                        <svg data-testid="pause-button" viewBox="0 0 14 21" width="14" height="21">
                          <use xlinkHref="#pause"></use>
                        </svg>
                        <span>Pause</span>
                      </>
                      :
                      <>
                        <svg data-testid="play-button" viewBox="0 0 19 19" width="19" height="19">
                          <use xlinkHref="#play-s"></use>
                        </svg>
                        <span>Play</span>
                      </>}
                  </button>
                  <div className="player__name">{film.name}</div>
                  <button data-testid="full-screen" type="button" className="player__full-screen" onClick={handleFullScreenClick}>
                    <svg viewBox="0 0 27 27" width="27" height="27">
                      <use xlinkHref="#full-screen"></use>
                    </svg>
                    <span>Full screen</span>
                  </button>
                </div>
              </div>
            </>
            :
            <Loader />}
        </div>
      </>}
      {fetchingStatusFilm === RequestStatus.Pending && <Loader />}
      {fetchingStatusFilm === RequestStatus.Error && <ErrorLoad />}
    </>
  );
}

export default PlayerPage;

