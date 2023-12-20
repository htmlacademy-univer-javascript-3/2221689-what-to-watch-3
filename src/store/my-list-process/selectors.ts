import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getFavoriteFilms = (state: Pick<State, NameSpace.MyList>) => state[NameSpace.MyList].favoriteFilms;
export const getFavoriteFilmsCount = (state: Pick<State, NameSpace.MyList>) => state[NameSpace.MyList].favoriteFilmsCount;
export const getChangeFavoriteFilmsFetchingStatus = (state: Pick<State, NameSpace.MyList>) => state[NameSpace.MyList].changeFavoriteFilmsFetchingStatus;
export const getFavoriteFilmsFetchingStatus = (state: Pick<State, NameSpace.MyList>) => state[NameSpace.MyList].favoriteFilmsFetchingStatus;
