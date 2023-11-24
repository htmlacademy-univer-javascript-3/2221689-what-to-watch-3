import PromoFilm from '../../components/promo-film/promo-film';
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
import { getFilmsFetchingStatus, getFilms, getMaxShownFilmCount, getPromoFilm, getPromoFilmFetchingStatus } from '../../store/film-data/selectors';
import { setDefaultCountShownFilms } from '../../store/film-data/film-data';
import Footer from '../../components/footer/footer';
import useFilmsByGenre from '../../hooks/use-films-by-genre';
import { fetchPromoFilm } from '../../store/api-actions';

function MainPage(): JSX.Element {
  const films = useAppSelector(getFilms);
  const fetchingStatus = useAppSelector(getFilmsFetchingStatus);
  const fetchingStatusPromoFilm = useAppSelector(getPromoFilmFetchingStatus);
  const filmsByGenre = useFilmsByGenre(films);
  const maxShownCountFilm = useAppSelector(getMaxShownFilmCount);
  const genres = getGenreList(films);
  const promoFilm = useAppSelector(getPromoFilm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoFilm());
    dispatch(setDefaultCountShownFilms());
  }, [dispatch]);

  return (
    <>

      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        {fetchingStatusPromoFilm === RequestStatus.Pending && <Loader/>}
        {fetchingStatusPromoFilm === RequestStatus.Success && <PromoFilm promoFilm={promoFilm}/>}
        {fetchingStatusPromoFilm === RequestStatus.Error && <ErrorLoad/>}
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
