import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getGenre = (state: Pick<State, NameSpace.Films>) => state[NameSpace.Films].genre;
export const getFilms = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].filmCards;
export const getFilm = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].film;
export const getFilmsFetchingStatus = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].filmsFetchingStatus;
export const getFilmFetchingStatus = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].filmFetchingStatus;
export const getRelatedFilms = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].relatedFilms;
export const getRelatedFilmsFetchingStatus = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].relatedFilmsFetchingStatus;
export const getPromoFilmFetchingStatus = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].promoFilmFetchingStatus;
export const getPromoFilm = (state: Pick<State, NameSpace.Films>)=> state[NameSpace.Films].promoFilm;
