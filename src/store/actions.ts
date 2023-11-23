import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ReviewProps } from '../types/review.props';

export const changeGenre = createAction<{ genre: string }>('changeGenre');

export const getFilmCardsByGenre = createAction('getFilmCardsByGenre');

export const changeCountShownFilms = createAction('changeCountShownFilms');

export const setDefaultCountShownFilms = createAction('setDefaultCountShownFilms');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const redirectToRoute = createAction<string>('redirectToRoute');

export const addReview = createAction<ReviewProps>('addReview');
