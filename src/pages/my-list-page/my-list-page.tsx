import FilmsList from '../../components/films-list/films-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms, getFavoriteFilmsCount, getFavoriteFilmsFetchingStatus } from '../../store/my-list-process/selectors';
import { useEffect } from 'react';
import { fetchFavoriteFilms } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { Loader } from '../../components/loader/loader';
import { ErrorLoad } from '../../components/error-load/error-load';

function MyListPage(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const fetchingStatusFavoriteFilms = useAppSelector(getFavoriteFilmsFetchingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilms());
  }, [dispatch]);

  return (
    <>
      {fetchingStatusFavoriteFilms === RequestStatus.Success &&
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>
          <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsCount}</span></h1>
          <UserBlock/>
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmsList filmCards={favoriteFilms}/>
        </section>

        <Footer/>
      </div>}
      {fetchingStatusFavoriteFilms === RequestStatus.Pending && <Loader/>}
      {fetchingStatusFavoriteFilms === RequestStatus.Error && <ErrorLoad/>}
    </>
  );
}

export default MyListPage;
