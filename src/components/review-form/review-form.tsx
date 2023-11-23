import { ChangeEvent, FormEvent, Fragment, useState } from 'react';
import { RatingValues } from '../../const';
import { useAppDispatch } from '../../hooks';
import { reviewAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';

function ReviewForm(): JSX.Element {
  const {id} = useParams();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const dispatch = useAppDispatch();

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (rating && comment && comment.trim() !== '') {
      dispatch(reviewAction({filmId: id as string, comment, rating: Number(rating)}));
    }
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
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
                  onChange={handleInputChange}
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

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            value={comment}
            id="review-text"
            placeholder="Review text"
            onChange={handleTextareaChange}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
