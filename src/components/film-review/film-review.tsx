import { TReview } from '../../types/review.props';
import Review from '../review/review';

type FilmReviewProps = {
    reviews: TReview[];
}

function FilmReview({ reviews }: FilmReviewProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </div>
    </div>
  );
}

export default FilmReview;
