import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ErrorLoad } from '../error-load/error-load';
import { Loader } from '../loader/loader';
import Review from '../review/review';
import { fetchReviews } from '../../store/api-actions';

type FilmReviewProps = {
    filmId: string;
}

function FilmReview({ filmId }: FilmReviewProps): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);
  const fetchingStatus = useAppSelector((state) => state.reviewsFetchingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviews({filmId}));
  }, [filmId, dispatch]);

  return (
    <>
      {fetchingStatus === RequestStatus.Pending && <Loader />}
      {fetchingStatus === RequestStatus.Error && <ErrorLoad/>}
      {fetchingStatus === RequestStatus.Success &&
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </div>
    </div>}
    </>
  );
}

export default FilmReview;
