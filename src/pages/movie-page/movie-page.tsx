import { Link, useNavigate, useParams } from 'react-router-dom';
import Tabs from '../../components/tabs/tabs';
import RelatedFilms from '../../components/related-films/related-films';
import { useEffect } from 'react';
import { fetchFilm } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import Header from '../../components/header/header';
import NotFoundPage from '../not-found-page/not-found-page';
import { getFilm, getFilmFetchingStatus } from '../../store/film-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Footer from '../../components/footer/footer';
import FavoriteStatusButton from '../../components/favorite-status-button/favorite-status-button';

export function MoviePage(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchingStatusFilm = useAppSelector(getFilmFetchingStatus);
  const film = useAppSelector(getFilm);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

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
        <>
          <section className="film-card film-card--full">
            <div className="film-card__hero">
              <div className="film-card__bg">
                <img src={film.backgroundImage} alt={film.name} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <Header/>

              <div className="film-card__wrap">
                <div className="film-card__desc">
                  <h2 className="film-card__title">{film.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{film.genre}</span>
                    <span className="film-card__year">{film.released}</span>
                  </p>

                  <div className="film-card__buttons">
                    <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${film.id}`)}>
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <FavoriteStatusButton filmId={film.id} isFavorite={film.isFavorite}/>
                    {authorizationStatus === AuthorizationStatus.Auth
                && <Link to={`/films/${film.id}/review`} className="btn film-card__button">Add review</Link>}
                  </div>
                </div>
              </div>
            </div>

            <div className="film-card__wrap film-card__translate-top">
              <div className="film-card__info">
                <div className="film-card__poster film-card__poster--big">
                  <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
                </div>

                <div className="film-card__desc">
                  <Tabs filmCard={film}/>
                </div>
              </div>
            </div>
          </section>
          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <RelatedFilms filmCard={film}/>
            </section>

            <Footer/>
          </div>
        </>}

    </>
  );
}

export default MoviePage;
