import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { APIRoute, CommentLength, RatingValues, RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { reviewAction } from '../../store/api-actions';
import { useNavigate, useParams } from 'react-router-dom';
import './review-form.css';
import { getReviewsPostFetchingStatus } from '../../store/reviews-data/selectors';

function ReviewForm(): JSX.Element {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [commentError, setCommentError] = useState('');
  const [ratingError, setRatingError] = useState('');
  const fetchingStatusPostReview = useAppSelector(getReviewsPostFetchingStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (rating && comment && comment.trim() !== '' && comment.length >= CommentLength.Min && comment.length <= CommentLength.Max) {
      setCommentError('');
      dispatch(reviewAction({ filmId: id as string, comment, rating: Number(rating) }));
      navigate(`${APIRoute.Films}/${id as string}`);
    }
    if (comment.length < CommentLength.Min || comment.length > CommentLength.Max) {
      setCommentError('The length of the review should at least 50 and no more than 400 characters.');
    } else {
      setCommentError('');
    }
    setRatingError(!rating ? 'Please set the number of stars' : '');
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {RatingValues.map((value) => (
              <Fragment key={value}>
                <input
                  className="rating__input"
                  id={`star-${value}`}
                  type="radio"
                  name="rating"
                  value={value}
                  data-testid="rating"
                  onChange={handleInputChange}
                  disabled={fetchingStatusPostReview === RequestStatus.Pending}
                />
                <label
                  className="rating__label"
                  htmlFor={`star-${value}`}
                >{`Rating ${value}`}
                </label>
              </Fragment>
            ))}
          </div>
        </div>
        {(commentError) &&
            <div className="add-review__message">
              <p>{commentError}</p>
            </div>}
        {((ratingError) &&
            <div className="add-review__message">
              <p>{ratingError}</p>
            </div>
        )}
        <div className="add-review__text">
          <textarea
            data-testid="textarea-review"
            className="add-review__textarea"
            name="review-text"
            value={comment}
            id="review-text"
            placeholder="Review text"
            onChange={handleTextareaChange}
            disabled={fetchingStatusPostReview === RequestStatus.Pending}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={fetchingStatusPostReview === RequestStatus.Pending}>Post</button>
          </div>
        </div>
      </form>
    </div>

  );
}

export default ReviewForm;
