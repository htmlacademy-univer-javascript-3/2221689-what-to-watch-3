import { Route, BrowserRouter, Routes } from 'react-router-dom';
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
import { ReviewProps } from '../../types/review.props';

type AppScreenProps = {
  promoFilm: PromoFilmProps;
  filmCards: FilmCardProps[];
  reviews: ReviewProps[];
}

function App({ promoFilm, filmCards, reviews }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
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
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <MyListPage filmCards={filmCards}/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePage filmCards={filmCards} reviews={reviews}/>}
        />
        <Route
          path={AppRoute.AddReview}
          element={<AddReviewPage filmCards={filmCards}/>}
        />
        <Route
          path={AppRoute.Player}
          element={<PlayerPage filmCards={filmCards} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
