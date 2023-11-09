import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction<{ genre: string }>('changeGenre');

export const getFilmCardsByGenre = createAction('getFilmCardsByGenre');

export const changeCountShownFilms = createAction('changeCountShownFilms');

export const setDefaultCountShownFilms = createAction('setDefaultCountShownFilms');
