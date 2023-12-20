import { Months } from '../../const';
import { ReviewProps } from '../../types/review.props';
import getDate from '../../utils/get-date';

type ReviewsProps = {
    review: ReviewProps;
}

function Review({ review }: ReviewsProps): JSX.Element {
  const {day, month, year} = getDate(review.date);
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={review.date}>{`${Months[month]} ${day}, ${year}`}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}

export default Review;
