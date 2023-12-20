import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import FilmDetails from './film-details';
import { mockFilm } from '../../mocks/mock-full-film';

describe('Component: FilmDetails', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<FilmDetails filmCard={mockFilm}/>);

    render(preparedComponent);

    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
  });
});
