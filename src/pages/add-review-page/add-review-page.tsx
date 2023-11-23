import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFilm } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import NotFoundPage from '../not-found-page/not-found-page';
import { getFilm, getFilmFetchingStatus } from '../../store/film-data/selectors';
import Header from '../../components/header/header';

function AddReviewPage(): JSX.Element {
  const {id} = useParams();
  const fetchingStatusFilm = useAppSelector(getFilmFetchingStatus);
  const film = useAppSelector(getFilm);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilm({filmId: id}));
    }
  }, [id, dispatch]);

  return (
    <>
      {fetchingStatusFilm === RequestStatus.Pending && <Loader/>}
      {fetchingStatusFilm === RequestStatus.Error && <NotFoundPage/>}
      {fetchingStatusFilm === RequestStatus.Success &&
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.posterImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <ReviewForm/>
    </section>}
    </>
  );
}

export default AddReviewPage;
