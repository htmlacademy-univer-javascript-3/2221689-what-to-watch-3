import { DEFAULT_GENRE, RequestStatus } from '../../const';
import { mockFilm } from '../../mocks/mock-full-film';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { mockPromoFilm } from '../../mocks/mock-promo-film';
import { FullFilmCard } from '../../types/full-film-card';
import { PromoFilmType } from '../../types/promo-film';
import { FilmData } from '../../types/state.props';
import { fetchFilm, fetchFilms, fetchPromoFilm, fetchReleatedFilms } from '../api-actions';
import { changeGenre, filmData } from './film-data';

describe('FilmData Slice', () => {
  const initialState: FilmData = {
    genre: DEFAULT_GENRE,
    filmCards: [],
    film: {} as FullFilmCard,
    filmsFetchingStatus: RequestStatus.Idle,
    filmFetchingStatus: RequestStatus.Idle,
    relatedFilms: [],
    relatedFilmsFetchingStatus: RequestStatus.Idle,
    promoFilm: {} as PromoFilmType,
    promoFilmFetchingStatus: RequestStatus.Idle
  };

  describe('changeGenre', () => {
    it('should change genre', () => {
      const expectedGenre = 'Comedy';
      const result = filmData.reducer(initialState, changeGenre({genre: expectedGenre}));

      expect(result.genre).toEqual(expectedGenre);
    });
  });

  describe('fetchFilms', () => {
    it('should set "filmsFetchingStatus" to "Error" with "fetchFilms.rejected', () => {
      const expectedState = {...initialState, filmsFetchingStatus: 'Error'};

      const result = filmData.reducer(initialState, fetchFilms.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "filmsFetchingStatus" to "Pending" with "fetchFilms.pending', () => {
      const expectedState = {...initialState, filmsFetchingStatus: 'Pending'};

      const result = filmData.reducer(initialState, fetchFilms.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "filmsFetchingStatus" to "fulfilled" and payload on "filmCards" with "fetchFilms.fulfilled', () => {
      const expectedState = {...initialState, filmsFetchingStatus: 'Success', filmCards: mockPreviewFilmCards};

      const result = filmData.reducer(initialState, fetchFilms.fulfilled(mockPreviewFilmCards, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFilm', () => {
    it('should set "filmFetchingStatus" to "Error" with "fetchFilm.rejected', () => {
      const expectedState = {...initialState, filmFetchingStatus: 'Error'};

      const result = filmData.reducer(initialState, fetchFilm.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "filmFetchingStatus" to "Pending" with "fetchFilm.pending', () => {
      const expectedState = {...initialState, filmFetchingStatus: 'Pending'};

      const result = filmData.reducer(initialState, fetchFilm.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "filmFetchingStatus" to "fulfilled" and payload on "film" with "fetchFilm.fulfilled', () => {
      const expectedState = {...initialState, filmFetchingStatus: 'Success', film: mockFilm};

      const result = filmData.reducer(initialState, fetchFilm.fulfilled(mockFilm, '', {filmId: ''}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchReleatedFilms', () => {
    it('should set "relatedFilmsFetchingStatus" to "Error" with "fetchReleatedFilms.rejected', () => {
      const expectedState = {...initialState, relatedFilmsFetchingStatus: 'Error'};

      const result = filmData.reducer(initialState, fetchReleatedFilms.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "relatedFilmsFetchingStatus" to "Pending" with "fetchReleatedFilms.pending', () => {
      const expectedState = {...initialState, relatedFilmsFetchingStatus: 'Pending'};

      const result = filmData.reducer(initialState, fetchReleatedFilms.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "relatedFilmsFetchingStatus" to "fulfilled" and payload on "relatedFilms" with "fetchReleatedFilms.fulfilled', () => {
      const expectedState = {...initialState, relatedFilmsFetchingStatus: 'Success', relatedFilms: mockPreviewFilmCards};

      const result = filmData.reducer(initialState, fetchReleatedFilms.fulfilled(mockPreviewFilmCards, '', {filmId: ''}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchPromoFilm', () => {
    it('should set "promoFilmFetchingStatus" to "Error" with "fetchPromoFilm.rejected', () => {
      const expectedState = {...initialState, promoFilmFetchingStatus: 'Error'};

      const result = filmData.reducer(initialState, fetchPromoFilm.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "promoFilmFetchingStatus" to "Pending" with "fetchPromoFilm.pending', () => {
      const expectedState = {...initialState, promoFilmFetchingStatus: 'Pending'};

      const result = filmData.reducer(initialState, fetchPromoFilm.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "promoFilmFetchingStatus" to "fulfilled" and payload on "promoFilm" with "fetchPromoFilm.fulfilled', () => {
      const expectedState = {...initialState, promoFilmFetchingStatus: 'Success', promoFilm: mockPromoFilm};

      const result = filmData.reducer(initialState, fetchPromoFilm.fulfilled(mockPromoFilm, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });
});
