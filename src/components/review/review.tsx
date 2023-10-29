import { months } from '../../const';
import { TReview } from '../../types/review.props';

type ReviewProps = {
    review: TReview;
}

function Review({ review }: ReviewProps): JSX.Element {
  const date = new Date(review.date);
  const month = date.getMonth() + 1 as keyof typeof months;
  const day = date.getUTCDate();
  const year = date.getFullYear();
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={review.date}>{`${months[month]} ${day}, ${year}`}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default Review;
