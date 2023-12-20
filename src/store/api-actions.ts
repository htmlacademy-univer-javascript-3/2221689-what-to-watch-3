import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmCardType } from '../types/film-card.type';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { AppDispatch, State } from '../types/state.props';
import { redirectToRoute } from './actions';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data.props';
import { AuthInfo } from '../types/auth-info.props';
import { FullFilmCard } from '../types/full-film-card';
import { ReviewProps } from '../types/review.props';
import { addReview } from './reviews-data/reviews-data';
import { PromoFilmType } from '../types/promo-film';

export const fetchFilms = createAsyncThunk<FilmCardType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FilmCardType[]>(APIRoute.Films);
    return data;
  }
);

export const fetchFilm = createAsyncThunk<FullFilmCard, { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getFilm',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<FullFilmCard>(`${APIRoute.Films}/${filmId}`);
    return data;
  }
);

export const fetchReleatedFilms = createAsyncThunk<FilmCardType[], { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getRelatedFilms',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<FilmCardType[]>(`${APIRoute.Films}/${filmId}/similar`);
    return data;
  }
);

export const fetchReviews = createAsyncThunk<ReviewProps[], { filmId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/getReviews',
  async ({ filmId }, { extra: api }) => {
    const { data } = await api.get<ReviewProps[]>(`comments/${filmId}`);
    return data;
  }
);

export const fetchPromoFilm = createAsyncThunk<PromoFilmType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PromoFilmType>(`${APIRoute.Promo}`);
    return data;
  }
);

export const fetchFavoriteFilms = createAsyncThunk<FilmCardType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/getFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<FilmCardType[]>(`${APIRoute.Favorite}`);
    return data;
  }
);

export const changeFavoriteFilms = createAsyncThunk<number, { filmId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/changeFavoriteFilms',
  async ({ filmId, status }, { extra: api }) => {
    const { data } = await api.post<FullFilmCard>(`${APIRoute.Favorite}/${filmId}/${status}`, { filmId, status });
    return data.isFavorite ? 1 : -1;
  },
);

export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const response = await api.get<AuthInfo>(APIRoute.Login);
    return response.data;
  },
);

export const reviewAction = createAsyncThunk<void, { filmId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/addReview',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    const response = await api.post<ReviewProps>(`comments/${filmId}`, { comment, rating });
    dispatch(addReview(response.data));
  },
);

export const loginAction = createAsyncThunk<AuthInfo, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const response = await api.post<AuthInfo>(APIRoute.Login, { email, password });
    saveToken(response.data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return response.data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
