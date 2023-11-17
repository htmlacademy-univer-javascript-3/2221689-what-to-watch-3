import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCardProps } from '../types/film-card.props';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AppDispatch, State } from '../types/state.props';
import { addReview, redirectToRoute, requireAuthorization } from './actions';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.props';
import { AuthInfo } from '../types/auth-info.props';
import { FullFilmCard } from '../types/full-film-card.props';
import { ReviewProps } from '../types/review.props';

export const fetchFilms = createAsyncThunk<FilmCardProps[], undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }> (
    'films/getFilms',
    async (_arg, {extra: api}) => {
      const { data } = await api.get<FilmCardProps[]>(APIRoute.Films);
      return data;
    }
  );

export const fetchFilm = createAsyncThunk<FullFilmCard, { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'film/getFilm',
  async ({ filmId }, {extra: api}) => {
    const { data } = await api.get<FullFilmCard>(`${APIRoute.Films}/${filmId}`);
    return data;
  }
);

export const fetchReleatedFilms = createAsyncThunk<FilmCardProps[], { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'films/getRelatedFilms',
  async ({ filmId }, {extra: api}) => {
    const { data } = await api.get<FilmCardProps[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  }
);

export const fetchReviews = createAsyncThunk<ReviewProps[], { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> (
  'comments/getReviews',
  async ({ filmId }, {extra: api}) => {
    const { data } = await api.get<ReviewProps[]>(`comments/${filmId}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }> (
    'user/checkAuth',
    async (_arg, {dispatch, extra: api}) => {
      try {
        await api.get(APIRoute.Login);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    },
  );

export const reviewAction = createAsyncThunk<void, {filmId: string; comment: string; rating: number}, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }> (
    'comments/addReview',
    async ({filmId, comment, rating}, {dispatch, extra: api}) => {
      const response = await api.post<ReviewProps>(`comments/${filmId}`, {comment, rating});
      dispatch(addReview(response.data));
    },
  );

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }> (
    'user/login',
    async ({login: email, password}, {dispatch, extra: api}) => {
      const response = await api.post<AuthInfo>(APIRoute.Login, {email, password});
      saveToken(response.data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }> (
    'user/logout',
    async (_arg, {dispatch, extra: api}) => {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    },
  );
