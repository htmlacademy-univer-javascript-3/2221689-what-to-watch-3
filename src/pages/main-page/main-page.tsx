import PromoFilm from '../../components/promo-film/promo-film';
import { MainPageProps } from '../../types/main-page.props';
import FilmsList from '../../components/films-list/films-list';
import { Link } from 'react-router-dom';
import GenreList from '../../components/genre-list/genre-list';
import getGenreList from '../../utils/get-genre-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect } from 'react';
import { setDefaultCountShownFilms } from '../../store/actions';

function MainPage({ promoFilm }: MainPageProps): JSX.Element {
  const films = useAppSelector((state) => state.filmCards);
  const filmsByGenre = useAppSelector((state) => state.filmCardsByGenre);
  const maxShownCountFilm = useAppSelector((state) => state.maxShownFilmCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDefaultCountShownFilms());
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <Link className="logo__link" to="/">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

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
        <PromoFilm
          titleFilm={promoFilm.titleFilm}
          genreFilm={promoFilm.genreFilm}
          yearFilm={promoFilm.yearFilm}
        />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList genres={getGenreList(films)}/>

          <FilmsList filmCards={filmsByGenre} filmCount={maxShownCountFilm}/>
          
          {maxShownCountFilm < filmsByGenre.length && <ShowMoreButton/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={'/'} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainPage;
