import { ChangeEvent, Fragment, useState } from 'react';
import { RatingMap } from '../../const';

function ReviewForm(): JSX.Element {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {Object.entries(RatingMap)
              .reverse()
              .map(([score]) => (
                <Fragment key={score}>
                  <input
                    className="rating__input"
                    id={`star-${score}`}
                    type="radio"
                    name="rating"
                    value={score}
                    checked={rating === score}
                    onChange={handleInputChange}
                  />
                  <label
                    className="rating__label"
                    htmlFor={`star-${score}`}
                  >{`Rating ${score}`}
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
