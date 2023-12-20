import { NameSpace, RequestStatus } from '../../const';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { getChangeFavoriteFilmsFetchingStatus, getFavoriteFilms, getFavoriteFilmsCount, getFavoriteFilmsFetchingStatus } from './selectors';

describe('MyListProcess selectors', () => {
  const state = {
    [NameSpace.MyList]: {
      favoriteFilms: mockPreviewFilmCards,
      favoriteFilmsCount: 0,
      favoriteFilmsFetchingStatus: RequestStatus.Idle,
      changeFavoriteFilmsFetchingStatus: RequestStatus.Idle
    }
  };

  describe('favoriteFilms', () => {
    it('should return favoriteFilms from state', () => {
      const { favoriteFilms } = state[NameSpace.MyList];

      const result = getFavoriteFilms(state);

      expect(result).toBe(favoriteFilms);
    });

    it('should return favoriteFilmsFetchingStatus from state', () => {
      const { favoriteFilmsFetchingStatus } = state[NameSpace.MyList];

      const result = getFavoriteFilmsFetchingStatus(state);

      expect(result).toBe(favoriteFilmsFetchingStatus);
    });
  });

  describe('favoriteFilmsCount', () => {
    it('should return favoriteFilmsCount from state', () => {
      const { favoriteFilmsCount } = state[NameSpace.MyList];

      const result = getFavoriteFilmsCount(state);

      expect(result).toBe(favoriteFilmsCount);
    });

    it('should return changeFavoriteFilmsFetchingStatus from state', () => {
      const { changeFavoriteFilmsFetchingStatus } = state[NameSpace.MyList];

      const result = getChangeFavoriteFilmsFetchingStatus(state);

      expect(result).toBe(changeFavoriteFilmsFetchingStatus);
    });
  });
});
