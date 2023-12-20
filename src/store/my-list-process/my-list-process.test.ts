import { RequestStatus } from '../../const';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { MyListProcess } from '../../types/state.props';
import { changeFavoriteFilms, fetchFavoriteFilms } from '../api-actions';
import { myListProcess } from './my-list-process';

describe('MyListProcess Slice', () => {
  const initialState: MyListProcess = {
    favoriteFilms: [],
    favoriteFilmsCount: 0,
    favoriteFilmsFetchingStatus: RequestStatus.Idle,
    changeFavoriteFilmsFetchingStatus: RequestStatus.Idle
  };

  describe('fetchFavoriteFilms', () => {
    it('should set "favoriteFilmsFetchingStatus" to "Error" with "fetchFavoriteFilms.rejected', () => {
      const expectedState = {...initialState, favoriteFilmsFetchingStatus: 'Error'};

      const result = myListProcess.reducer(initialState, fetchFavoriteFilms.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "favoriteFilmsFetchingStatus" to "Pending" with "fetchFavoriteFilms.pending', () => {
      const expectedState = {...initialState, favoriteFilmsFetchingStatus: 'Pending'};

      const result = myListProcess.reducer(initialState, fetchFavoriteFilms.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "favoriteFilmsFetchingStatus" to "fulfilled" and payload on "favoriteFilms" and "favoriteFilmsCount" with "fetchFavoriteFilms.fulfilled', () => {
      const expectedState = {...initialState, favoriteFilmsFetchingStatus: 'Success', favoriteFilms: mockPreviewFilmCards, favoriteFilmsCount: 2};

      const result = myListProcess.reducer(initialState, fetchFavoriteFilms.fulfilled(mockPreviewFilmCards, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('changeFavoriteFilms', () => {
    it('should set "changeFavoriteFilmsFetchingStatus" to "Error" with "changeFavoriteFilms.rejected', () => {
      const expectedState = {...initialState, changeFavoriteFilmsFetchingStatus: 'Error'};

      const result = myListProcess.reducer(initialState, changeFavoriteFilms.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "changeFavoriteFilmsFetchingStatus" to "Pending" with "changeFavoriteFilms.pending', () => {
      const expectedState = {...initialState, changeFavoriteFilmsFetchingStatus: 'Pending'};

      const result = myListProcess.reducer(initialState, changeFavoriteFilms.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "changeFavoriteFilmsFetchingStatus" to "fulfilled" and payload on "favoriteFilmsCount" with "changeFavoriteFilms.fulfilled', () => {
      const expectedState = {...initialState, changeFavoriteFilmsFetchingStatus: 'Success', favoriteFilmsCount: 1};

      const result = myListProcess.reducer(initialState, changeFavoriteFilms.fulfilled(1, '', {filmId: '', status: 0}));

      expect(result).toEqual(expectedState);
    });
  });
});
