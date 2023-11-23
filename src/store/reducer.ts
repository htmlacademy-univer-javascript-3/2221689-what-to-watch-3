import { createReducer } from '@reduxjs/toolkit';
import { addReview, changeCountShownFilms, changeGenre, getFilmCardsByGenre, requireAuthorization, setDefaultCountShownFilms } from './actions';
import { AuthorizationStatus, DEFAULT_GENRE, MAX_COUNT_SHOWN_FILMS, RequestStatus } from '../const';
import { fetchFilm, fetchFilms, fetchReleatedFilms, fetchReviews } from './api-actions';
import { FilmCardProps } from '../types/film-card.props';
import { FullFilmCard } from '../types/full-film-card.props';
import { ReviewProps } from '../types/review.props';

const initialState: {
  genre: string;
  filmCards: FilmCardProps[];
  filmCardsByGenre: FilmCardProps[];
  film: FullFilmCard;
  maxShownFilmCount: number;
  filmsFetchingStatus: string;
  filmFetchingStatus: string;
  relatedFilms: FilmCardProps[];
  relatedFilmsFetchingStatus: string;
  reviews: ReviewProps[];
  reviewsFetchingStatus: string;
  authorizationStatus: string;
} = {
  genre: DEFAULT_GENRE,
  filmCards: [],
  filmCardsByGenre: [],
  film: {} as FullFilmCard,
  maxShownFilmCount: MAX_COUNT_SHOWN_FILMS,
  filmsFetchingStatus: RequestStatus.Idle,
  filmFetchingStatus: RequestStatus.Idle,
  relatedFilms: [],
  relatedFilmsFetchingStatus: RequestStatus.Idle,
  reviews: [],
  reviewsFetchingStatus: RequestStatus.Idle,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(fetchFilms.pending, (state) => {
      state.filmsFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.filmsFetchingStatus = RequestStatus.Success;
      state.filmCards = action.payload;
      state.filmCardsByGenre = action.payload;
    })
    .addCase(fetchFilms.rejected, (state) => {
      state.filmsFetchingStatus = RequestStatus.Error;
    })
    .addCase(fetchFilm.pending, (state) => {
      state.filmFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchFilm.fulfilled, (state, action) => {
      state.filmFetchingStatus = RequestStatus.Success;
      state.film = action.payload;
    })
    .addCase(fetchFilm.rejected, (state) => {
      state.filmFetchingStatus = RequestStatus.Error;
    })
    .addCase(fetchReleatedFilms.pending, (state) => {
      state.relatedFilmsFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchReleatedFilms.fulfilled, (state, action) => {
      state.relatedFilmsFetchingStatus = RequestStatus.Success;
      state.relatedFilms = action.payload;
    })
    .addCase(fetchReleatedFilms.rejected, (state) => {
      state.relatedFilmsFetchingStatus = RequestStatus.Error;
    })
    .addCase(fetchReviews.pending, (state) => {
      state.reviewsFetchingStatus = RequestStatus.Pending;
    })
    .addCase(fetchReviews.fulfilled, (state, action) => {
      state.reviewsFetchingStatus = RequestStatus.Success;
      state.reviews = action.payload;
    })
    .addCase(fetchReviews.rejected, (state) => {
      state.reviewsFetchingStatus = RequestStatus.Error;
    })
    .addCase(getFilmCardsByGenre, (state) => {
      state.filmCardsByGenre = state.genre === DEFAULT_GENRE ? state.filmCards :
        state.filmCards.filter((film) => film.genre === state.genre);
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeCountShownFilms, (state) => {
      state.maxShownFilmCount += MAX_COUNT_SHOWN_FILMS;
    })
    .addCase(setDefaultCountShownFilms, (state) => {
      state.maxShownFilmCount = MAX_COUNT_SHOWN_FILMS;
    });
});

export { reducer };
