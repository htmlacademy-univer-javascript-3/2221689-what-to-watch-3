import PromoFilm from '../../components/promo-film/promo-film';
import { MainPageProps } from '../../types/main-page.props';
import FilmsList from '../../components/films-list/films-list';
import GenreList from '../../components/genre-list/genre-list';
import getGenreList from '../../utils/get-genre-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import { ErrorLoad } from '../../components/error-load/error-load';
import Header from '../../components/header/header';
import { getFilmsFetchingStatus, getFilms, getMaxShownFilmCount } from '../../store/film-data/selectors';
import { setDefaultCountShownFilms } from '../../store/film-data/film-data';
import Footer from '../../components/footer/footer';
import useFilmsByGenre from '../../utils/get-all-films-by-genre';

function MainPage({ promoFilm }: MainPageProps): JSX.Element {
  const films = useAppSelector(getFilms);
  const fetchingStatus = useAppSelector(getFilmsFetchingStatus);
  const filmsByGenre = useFilmsByGenre(films);
  const maxShownCountFilm = useAppSelector(getMaxShownFilmCount);
  const genres = getGenreList(films);
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
        <Header/>
        <PromoFilm
          titleFilm={promoFilm.titleFilm}
          genreFilm={promoFilm.genreFilm}
          yearFilm={promoFilm.yearFilm}
        />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          {fetchingStatus === RequestStatus.Pending && <Loader />}
          {fetchingStatus === RequestStatus.Success && (
            <>
              <GenreList genres={genres}/>
              <FilmsList filmCards={filmsByGenre} filmCount={maxShownCountFilm} />
              {maxShownCountFilm < films.length && <ShowMoreButton />}
            </>
          )}
          {fetchingStatus === RequestStatus.Error && <ErrorLoad />}
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
