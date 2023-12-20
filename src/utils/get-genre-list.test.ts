import { mockPreviewFilmCards } from '../mocks/mock-preview-film-cards';
import getGenreList from './get-genre-list';

describe('Function: getGenreList', () => {
  it('should return genre list', () => {
    const expectedResult = ['All genres', 'Drama'];

    const result = getGenreList(mockPreviewFilmCards);

    expect(result).toStrictEqual(expectedResult);
  });
});
