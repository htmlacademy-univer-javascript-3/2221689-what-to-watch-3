import { Link } from 'react-router-dom';
import { FilmCardProps } from '../../types/film-card.props';
import VideoPlayer from '../video-player/video-player';
import PosterFilm from '../poster-film/poster-film';

function FilmCard({ id, srcImage, title, previewVideoLink, isActive }: FilmCardProps): JSX.Element {
  return (
    <>
      <div className="small-film-card__image">
        {isActive === id ? <VideoPlayer srcVideo={previewVideoLink}/> : <PosterFilm title={title} srcImage={srcImage}/>}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </>
  );
}

export default FilmCard;
