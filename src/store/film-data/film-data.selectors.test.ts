import { DEFAULT_GENRE, NameSpace, RequestStatus } from '../../const';
import { mockFilm } from '../../mocks/mock-full-film';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { mockPromoFilm } from '../../mocks/mock-promo-film';
import { getFilm, getFilmFetchingStatus, getFilms, getFilmsFetchingStatus, getGenre, getPromoFilm, getPromoFilmFetchingStatus, getRelatedFilms, getRelatedFilmsFetchingStatus } from './selectors';

describe('FilmData selectors', () => {
  const state = {
    [NameSpace.Films]: {
      genre: DEFAULT_GENRE,
      filmCards: mockPreviewFilmCards,
      film: mockFilm,
      filmsFetchingStatus: RequestStatus.Idle,
      filmFetchingStatus: RequestStatus.Idle,
      relatedFilms: mockPreviewFilmCards,
      relatedFilmsFetchingStatus: RequestStatus.Idle,
      promoFilm: mockPromoFilm,
      promoFilmFetchingStatus: RequestStatus.Idle
    }
  };

  describe('genre', () => {
    it('should return genre from state', () => {
      const {genre} = state[NameSpace.Films];

      const result = getGenre(state);

      expect(result).toBe(genre);
    });
  });

  describe('filmCards', () => {
    it('should return filmCards from state', () => {
      const {filmCards} = state[NameSpace.Films];

      const result = getFilms(state);

      expect(result).toBe(filmCards);
    });

    it('should return filmsFetchingStatus from state', () => {
      const {filmsFetchingStatus} = state[NameSpace.Films];

      const result = getFilmsFetchingStatus(state);

      expect(result).toBe(filmsFetchingStatus);
    });
  });

  describe('film', () => {
    it('should return film from state', () => {
      const {film} = state[NameSpace.Films];

      const result = getFilm(state);

      expect(result).toBe(film);
    });

    it('should return filmFetchingStatus from state', () => {
      const {filmFetchingStatus} = state[NameSpace.Films];

      const result = getFilmFetchingStatus(state);

      expect(result).toBe(filmFetchingStatus);
    });
  });

  describe('relatedFilms', () => {
    it('should return relatedFilms from state', () => {
      const {relatedFilms} = state[NameSpace.Films];

      const result = getRelatedFilms(state);

      expect(result).toBe(relatedFilms);
    });

    it('should return relatedFilmsFetchingStatus from state', () => {
      const {relatedFilmsFetchingStatus} = state[NameSpace.Films];

      const result = getRelatedFilmsFetchingStatus(state);

      expect(result).toBe(relatedFilmsFetchingStatus);
    });
  });

  describe('promoFilm', () => {
    it('should return promoFilm from state', () => {
      const {promoFilm} = state[NameSpace.Films];

      const result = getPromoFilm(state);

      expect(result).toBe(promoFilm);
    });

    it('should return promoFilmFetchingStatus from state', () => {
      const {promoFilmFetchingStatus} = state[NameSpace.Films];

      const result = getPromoFilmFetchingStatus(state);

      expect(result).toBe(promoFilmFetchingStatus);
    });
  });
});
