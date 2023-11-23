import { Link, useParams } from 'react-router-dom';
import ReviewForm from '../../components/review-form/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchFilm } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import NotFoundPage from '../not-found-page/not-found-page';

function AddReviewPage(): JSX.Element {
  const {id} = useParams();
  const fetchingStatusFilm = useAppSelector((state) => state.filmFetchingStatus);
  const film = useAppSelector((state) => state.film);
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

        <header className="page-header">
          <div className="logo">
            <Link to={'/'} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id as string}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={'/login'} className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

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
