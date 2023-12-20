import { AuthorizationStatus, DEFAULT_GENRE } from '../const';
import { State } from '../types/state.props';
import { mockFilm } from './mock-full-film';
import { mockPreviewFilmCards } from './mock-preview-film-cards';
import { mockPromoFilm } from './mock-promo-film';
import { mockReviews } from './mock-reviews';

export const fakeAuthInfo = {
  name: 'Oliver.conner',
  avatarUrl: 'https://url-to-image/image.jpg',
  email: 'Oliver.conner@gmail.com',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
};

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  FILMS: {
    genre: DEFAULT_GENRE,
    filmCards: mockPreviewFilmCards,
    film: mockFilm,
    filmsFetchingStatus: 'Success',
    filmFetchingStatus: 'Success',
    relatedFilms: mockPreviewFilmCards,
    relatedFilmsFetchingStatus: 'Success',
    promoFilm: mockPromoFilm,
    promoFilmFetchingStatus: 'Success'
  },
  MYLIST: {
    favoriteFilms: mockPreviewFilmCards,
    favoriteFilmsCount: 0,
    favoriteFilmsFetchingStatus: 'Success',
    changeFavoriteFilmsFetchingStatus: 'Success'
  },
  COMMENTS: {
    reviews: mockReviews,
    reviewsFetchingStatus: 'Success',
    reviewsPostFetchingStatus: 'Success'
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Auth,
    authInfo: fakeAuthInfo
  },
  ...initialState ?? {},
});


