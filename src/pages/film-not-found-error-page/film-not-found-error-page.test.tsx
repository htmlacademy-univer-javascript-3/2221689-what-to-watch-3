import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import FilmNotFoundErrorPage from './film-not-found-error-page';

describe('Component: FilmNotFoundErrorPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Film was not found';
    const preparedComponent = withHistory(<FilmNotFoundErrorPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
