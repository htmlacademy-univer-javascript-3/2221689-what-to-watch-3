import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, NameSpace, RequestStatus } from '../../const';
import { FullFilmCard } from '../../types/full-film-card';
import { FilmData } from '../../types/state.props';
import { fetchFilm, fetchFilms, fetchPromoFilm, fetchReleatedFilms } from '../api-actions';
import { PromoFilmType } from '../../types/promo-film';

const initialState: FilmData = {
  genre: DEFAULT_GENRE,
  filmCards: [],
  film: {} as FullFilmCard,
  filmsFetchingStatus: RequestStatus.Idle,
  filmFetchingStatus: RequestStatus.Idle,
  relatedFilms: [],
  relatedFilmsFetchingStatus: RequestStatus.Idle,
  promoFilm: {} as PromoFilmType,
  promoFilmFetchingStatus: RequestStatus.Idle
};

export const filmData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{genre:string}>) => {
      state.genre = action.payload.genre;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.filmsFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.filmsFetchingStatus = RequestStatus.Success;
        state.filmCards = action.payload;
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
      .addCase(fetchPromoFilm.pending, (state) => {
        state.promoFilmFetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilmFetchingStatus = RequestStatus.Success;
        state.promoFilm = action.payload;
      })
      .addCase(fetchPromoFilm.rejected, (state) => {
        state.promoFilmFetchingStatus = RequestStatus.Error;
      });
  }
});

export const {changeGenre} = filmData.actions;
