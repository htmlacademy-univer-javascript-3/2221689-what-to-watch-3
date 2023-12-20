import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { Loader } from '../loader/loader';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getFilmsFetchingStatus } from '../../store/film-data/selectors';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRouteSignIn from '../private-route-sign-in/private-route-sign-in';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const fetchingStatusFilms = useAppSelector(getFilmsFetchingStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <Loader />
    );
  }
  return (
    <>
      {fetchingStatusFilms === RequestStatus.Success &&
        <HelmetProvider>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<MainPage />}
            />
            <Route
              path={AppRoute.SignIn}
              element={
                <PrivateRouteSignIn authorizationStatus={authorizationStatus}>
                  <SignInPage />
                </PrivateRouteSignIn>
              }
            />
            <Route
              path={AppRoute.MyList}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <MyListPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Film}
              element={<MoviePage />}
            />
            <Route
              path={AppRoute.AddReview}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <AddReviewPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Player}
              element={<PlayerPage />}
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
        </HelmetProvider>}
      {fetchingStatusFilms === RequestStatus.Pending && <Loader />}
      {fetchingStatusFilms === RequestStatus.Error && <NotFoundPage />}
    </>
  );
}

export default App;
