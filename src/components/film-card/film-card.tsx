import { Link } from 'react-router-dom';
import { FilmCardProps } from '../../types/film-card.props';

function FilmCard({ id, srcImage, title }: FilmCardProps): JSX.Element {
  return (
    <>
      <div className="small-film-card__image">
        <img src={srcImage} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{title}</Link>
      </h3>
    </>
  );
}

export default FilmCard;
