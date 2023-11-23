import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { PromoFilmProps } from '../../types/promo-film.props';
import { FilmCardProps } from '../../types/film-card.props';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { useAppSelector } from '../../hooks';
import { Loader } from '../loader/loader';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type AppScreenProps = {
  promoFilm: PromoFilmProps;
  filmCards: FilmCardProps[];
}

function App({ promoFilm, filmCards }: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <Loader />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage promoFilm={promoFilm} />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInPage />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage filmCards={filmCards}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePage/>}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage/>}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage filmCards={filmCards} />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
