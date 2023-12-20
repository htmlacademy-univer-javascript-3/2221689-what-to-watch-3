import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import FilmsList from './films-list';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';

describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<FilmsList filmCards={mockPreviewFilmCards} filmCount={8}/>);

    render(preparedComponent);

    mockPreviewFilmCards.forEach((film) => {
      expect(screen.getByText(film.name)).toBeInTheDocument();
    });
  });
});
