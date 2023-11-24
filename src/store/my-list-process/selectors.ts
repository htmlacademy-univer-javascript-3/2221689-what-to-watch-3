import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getFavoriteFilms = (state: State) => state[NameSpace.MyList].favoriteFilms;
export const getFavoriteFilmsCount = (state: State) => state[NameSpace.MyList].favoriteFilmsCount;
export const getChangeFavoriteFilmsFetchingStatus = (state: State) => state[NameSpace.MyList].changeFavoriteFilmsFetchingStatus;
export const getFavoriteFilmsFetchingStatus = (state: State) => state[NameSpace.MyList].favoriteFilmsFetchingStatus;
