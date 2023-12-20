import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import PosterFilm from './poster-film';

describe('Component: PosterFilm', () => {
  it('should render correctly', () => {
    const posterFilmTestId = 'poster';
    const preparedComponent = withHistory(<PosterFilm srcImage='' title='' />);

    render(preparedComponent);

    expect(screen.getByTestId(posterFilmTestId)).toBeInTheDocument();
  });
});
