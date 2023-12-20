import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import { mockFilm } from '../../mocks/mock-full-film';
import FilmOverview from './film-overview';

describe('Component: FilmOverview', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<FilmOverview filmCard={mockFilm}/>);

    render(preparedComponent);

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
  });
});
