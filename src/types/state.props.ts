import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { AuthInfo } from './auth-info.props';
import { FilmCardType } from './film-card.type';
import { FullFilmCard } from './full-film-card';
import { PromoFilmType } from './promo-film';
import { ReviewProps } from './review.props';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    authInfo: AuthInfo;
};

export type ReviewData = {
    reviews: ReviewProps[];
    reviewsFetchingStatus: string;
    reviewsPostFetchingStatus: string;
}

export type FilmData = {
    genre: string;
    filmCards: FilmCardType[];
    film: FullFilmCard;
    filmsFetchingStatus: string;
    filmFetchingStatus: string;
    relatedFilms: FilmCardType[];
    relatedFilmsFetchingStatus: string;
    promoFilm: PromoFilmType;
    promoFilmFetchingStatus: string;
}

export type MyListProcess = {
    favoriteFilms: FilmCardType[];
    favoriteFilmsCount: number;
    favoriteFilmsFetchingStatus: string;
    changeFavoriteFilmsFetchingStatus: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
