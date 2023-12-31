import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ErrorLoad } from '../error-load/error-load';
import { Loader } from '../loader/loader';
import Review from '../review/review';
import { fetchReviews } from '../../store/api-actions';
import { getReviews, getReviewsFetchingStatus } from '../../store/reviews-data/selectors';

type FilmReviewProps = {
  filmId: string;
}

function FilmReview({ filmId }: FilmReviewProps): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const fetchingStatus = useAppSelector(getReviewsFetchingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchReviews({ filmId }));
    }

    return () => {
      isMounted = false;
    };

  }, [filmId, dispatch]);

  return (
    <>
      {fetchingStatus === RequestStatus.Pending && <Loader />}
      {fetchingStatus === RequestStatus.Error && <ErrorLoad />}
      {fetchingStatus === RequestStatus.Success &&
        <div className="film-card__reviews film-card__row">
          <div className="film-card__reviews-col">
            {reviews.slice(0, reviews.length / 2).map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>

          <div className="film-card__reviews-col">
            {reviews.slice(reviews.length / 2).map((review) => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </div>}
    </>
  );
}

export default FilmReview;
