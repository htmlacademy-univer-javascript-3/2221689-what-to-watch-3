import { createReducer } from '@reduxjs/toolkit';
import { filmCards } from '../mocks/films';
import { changeCountShownFilms, changeGenre, getFilmCardsByGenre, setDefaultCountShownFilms } from './actions';
import { DEFAULT_GENRE, MAX_COUNT_SHOWN_FILMS } from '../const';

const initialState = {
  genre: DEFAULT_GENRE,
  filmCards,
  filmCardsByGenre: filmCards,
  maxShownFilmCount: MAX_COUNT_SHOWN_FILMS
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload.genre;
    })
    .addCase(getFilmCardsByGenre, (state) => {
      state.filmCardsByGenre = state.genre === DEFAULT_GENRE ? initialState.filmCardsByGenre :
        initialState.filmCardsByGenre.filter((film) => film.genre === state.genre);
    })
    .addCase(changeCountShownFilms, (state) => {
      state.maxShownFilmCount += MAX_COUNT_SHOWN_FILMS;
    })
    .addCase(setDefaultCountShownFilms, (state) => {
      state.maxShownFilmCount = MAX_COUNT_SHOWN_FILMS;
    });
});

export { reducer };
