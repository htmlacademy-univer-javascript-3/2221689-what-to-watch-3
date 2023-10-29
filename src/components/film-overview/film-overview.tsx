import { FilmCardProps } from '../../types/film-card.props';

type FilmOverviewProps = {
    filmCard: FilmCardProps;
}

function FilmOverview({ filmCard }: FilmOverviewProps): JSX.Element {
  let ratingName: string;

  if (filmCard.rating === 10) {
    ratingName = 'Awesome';
  } else if (filmCard.rating > 8) {
    ratingName = 'Very good';
  } else if (filmCard.rating > 5) {
    ratingName = 'Good';
  } else if (filmCard.rating > 3) {
    ratingName = 'Normal';
  } else {
    ratingName = 'Bad';
  }

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{filmCard.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingName}</span>
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
