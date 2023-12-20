import { mockPreviewFilmCards } from '../mocks/mock-preview-film-cards';
import getCurrentFilms from './get-current-films';

describe('Function: getCurrentFilms', () => {
  it('should return length is 1 when filmCount is 1', () => {
    const result = getCurrentFilms(mockPreviewFilmCards, 1);

    expect(result).toHaveLength(1);
  });

  it('should return length films when filmCount is undefined', () => {
    const result = getCurrentFilms(mockPreviewFilmCards, undefined);

    expect(result).toHaveLength(mockPreviewFilmCards.length);
  });
});
