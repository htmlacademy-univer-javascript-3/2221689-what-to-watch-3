import { Link } from 'react-router-dom';
import { FilmCardProps } from '../../types/film-card.props';
import VideoPlayer from '../video-player/video-player';
import { useState } from 'react';
import PosterFilm from '../poster-film/poster-film';

function FilmCard({ id, srcImage, title, previewVideoLink }: FilmCardProps): JSX.Element {
  const [videoOrImage, setVideoOrImage] = useState(<PosterFilm srcImage={srcImage} title={title} />);

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => {
      setTimeout(() => setVideoOrImage(<VideoPlayer srcVideo={previewVideoLink} />), 1000)
    }}
      onMouseOut={() => setVideoOrImage(<PosterFilm srcImage={srcImage} title={title} />)}
    >
      {videoOrImage}
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
