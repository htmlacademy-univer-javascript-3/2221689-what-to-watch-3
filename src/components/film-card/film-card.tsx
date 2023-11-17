import { Link } from 'react-router-dom';
import { FilmCardProps } from '../../types/film-card.props';
import VideoPlayer from '../video-player/video-player';
import PosterFilm from '../poster-film/poster-film';

function FilmCard({ id, previewImage, name, previewVideoLink, isActive }: FilmCardProps): JSX.Element {
  return (
    <>
      <div className="small-film-card__image">
        {isActive === id ? <VideoPlayer srcVideo={previewVideoLink}/> : <PosterFilm title={name} srcImage={previewImage}/>}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </>
  );
}

export default FilmCard;
