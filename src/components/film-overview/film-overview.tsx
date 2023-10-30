import { FilmCardProps } from '../../types/film-card.props';
import getRatingName from '../../get-rating-name';

type FilmOverviewProps = {
    filmCard: FilmCardProps;
}

function FilmOverview({ filmCard }: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmCard.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingName(filmCard.rating)}</span>
          <span className="film-rating__count">{`${filmCard.scoresCount} ratings`}</span>
        </p>
      </div>

      <div className="film-card__text">
        {filmCard.description}
        <p className="film-card__director"><strong>{`Director: ${filmCard.director}`}</strong></p>

        <p className="film-card__starring"><strong>{`Starring: ${filmCard.starring.join(', ')}`}</strong></p>
      </div>
    </>
  );
}

export default FilmOverview;
