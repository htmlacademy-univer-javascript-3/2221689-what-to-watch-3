import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import GenreList from './genre-list';
import getGenreList from '../../utils/get-genre-list';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';

describe('Component: GenreList', () => {
  it('should render correctly', () => {
    const mockGenres = getGenreList(mockPreviewFilmCards);
    const mockHandleClickGenre = vi.fn();
    const { withStoreComponent } = withStore(withHistory(<GenreList genres={mockGenres} onClickGenre={mockHandleClickGenre}/>), makeFakeStore());

    render(withStoreComponent);

    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('should add class "catalog__genres-item--active" for active genre', () => {
    const mockGenres = getGenreList(mockPreviewFilmCards);
    const mockHandleClickGenre = vi.fn();
    const { withStoreComponent } = withStore(withHistory(<GenreList genres={mockGenres} onClickGenre={mockHandleClickGenre}/>), makeFakeStore());
    const activeGenreTestId = 'genre-All genres';

    render(withStoreComponent);

    expect(screen.getByTestId(activeGenreTestId)).toBeInTheDocument();
    expect(screen.getByTestId(activeGenreTestId)).toHaveClass('catalog__genres-item--active');
  });
});
