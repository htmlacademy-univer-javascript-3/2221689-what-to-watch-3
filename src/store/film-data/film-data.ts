import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, MAX_COUNT_SHOWN_FILMS, NameSpace, RequestStatus } from '../../const';
import { FullFilmCard } from '../../types/full-film-card.props';
import { FilmData } from '../../types/state.props';
import { fetchFilm, fetchFilms, fetchReleatedFilms } from '../api-actions';

const initialState: FilmData = {
  genre: DEFAULT_GENRE,
  filmCards: [],
  film: {} as FullFilmCard,
  maxShownFilmCount: MAX_COUNT_SHOWN_FILMS,
  filmsFetchingStatus: RequestStatus.Idle,
  filmFetchingStatus: RequestStatus.Idle,
  relatedFilms: [],
  relatedFilmsFetchingStatus: RequestStatus.Idle
};

export const filmData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{genre:string}>) => {
      state.genre = action.payload.genre;
    },
    changeCountShownFilms: (state) => {
      state.maxShownFilmCount += MAX_COUNT_SHOWN_FILMS;
    },
    setDefaultCountShownFilms: (state) => {
      state.maxShownFilmCount = MAX_COUNT_SHOWN_FILMS;
    }
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
      });
  }
});

export const {changeGenre, changeCountShownFilms, setDefaultCountShownFilms} = filmData.actions;
