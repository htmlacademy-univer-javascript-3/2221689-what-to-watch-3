import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFilm } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import { getFilm, getFilmFetchingStatus } from '../../store/film-data/selectors';
import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import FilmNotFoundErrorPage from '../film-not-found-error-page/film-not-found-error-page';

function AddReviewPage(): JSX.Element {
  const { id } = useParams();
  const fetchingStatusFilm = useAppSelector(getFilmFetchingStatus);
  const film = useAppSelector(getFilm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (id) {
        dispatch(fetchFilm({ filmId: id }));
      }
    }

    return () => {
      isMounted = false;
    };

  }, [id, dispatch]);

  return (
    <>
      <Helmet>
        <title>Review of the film</title>
      </Helmet>
      {fetchingStatusFilm === RequestStatus.Pending && <Loader />}
      {fetchingStatusFilm === RequestStatus.Error && <FilmNotFoundErrorPage />}
      {fetchingStatusFilm === RequestStatus.Success &&
      <section className="film-card film-card--full" style={{ backgroundColor: `${film.backgroundColor}` }}>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header />
          
          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
          </div>
        </div>
        <ReviewForm />
      </section>}
    </>
  );
}

export default AddReviewPage;
