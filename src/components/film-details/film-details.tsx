import { FullFilmCard } from '../../types/full-film-card';
import { getRunTime } from '../../utils/get-runtime';
import Starring from '../starring/starring';

type FilmDetailsProps = {
    filmCard: FullFilmCard;
}

function FilmDetails({ filmCard }: FilmDetailsProps): JSX.Element {
  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{filmCard.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {filmCard.starring.slice(0, filmCard.starring.length - 1).map((star) => <Starring key={star} star={star}/>)}
            {filmCard.starring[filmCard.starring.length - 1]}
          </span>
        </p>
      </div>
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getRunTime(filmCard.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{filmCard.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{filmCard.released}</span>
        </p>
      </div>
    </div>
  );
}

export default FilmDetails;
