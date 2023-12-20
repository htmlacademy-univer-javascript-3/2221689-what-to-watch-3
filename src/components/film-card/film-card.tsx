import { Link } from 'react-router-dom';
import { FilmCardType } from '../../types/film-card.type';
import VideoPlayer from '../video-player/video-player';
import PosterFilm from '../poster-film/poster-film';
import { APIRoute } from '../../const';

function FilmCard({ id, previewImage, name, previewVideoLink, isActive, onMouseEnter, onMouseLeave }: FilmCardType): JSX.Element {
  return (
    <article data-testid="filmcard" className="small-film-card catalog__films-card" onMouseEnter={() => {
      if (onMouseEnter) {
        onMouseEnter(id);
      }
    }}
    onMouseLeave={onMouseLeave}
    >
      <div className="small-film-card__image">
        {isActive === id ? <VideoPlayer srcVideo={previewVideoLink} /> : <PosterFilm title={name} srcImage={previewImage} />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${APIRoute.Films}/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
