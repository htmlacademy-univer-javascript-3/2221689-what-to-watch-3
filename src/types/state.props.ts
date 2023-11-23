import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { FilmCardProps } from './film-card.props';
import { FullFilmCard } from './full-film-card.props';
import { ReviewProps } from './review.props';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
};

export type ReviewData = {
    reviews: ReviewProps[];
    reviewsFetchingStatus: string;
}

export type FilmData = {
    genre: string;
    filmCards: FilmCardProps[];
    film: FullFilmCard;
    maxShownFilmCount: number;
    filmsFetchingStatus: string;
    filmFetchingStatus: string;
    relatedFilms: FilmCardProps[];
    relatedFilmsFetchingStatus: string;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
