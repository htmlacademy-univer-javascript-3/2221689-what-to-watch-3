import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getGenre = (state: State) => state[NameSpace.Films].genre;
export const getFilms = (state: State)=> state[NameSpace.Films].filmCards;
export const getFilm = (state: State)=> state[NameSpace.Films].film;
export const getMaxShownFilmCount = (state: State)=> state[NameSpace.Films].maxShownFilmCount;
export const getFilmsFetchingStatus = (state: State)=> state[NameSpace.Films].filmsFetchingStatus;
export const getFilmFetchingStatus = (state: State)=> state[NameSpace.Films].filmFetchingStatus;
export const getRelatedFilms = (state: State)=> state[NameSpace.Films].relatedFilms;
export const getRelatedFilmsFetchingStatus = (state: State)=> state[NameSpace.Films].relatedFilmsFetchingStatus;
export const getPromoFilmFetchingStatus = (state: State)=> state[NameSpace.Films].promoFilmFetchingStatus;
export const getPromoFilm = (state: State)=> state[NameSpace.Films].promoFilm;
