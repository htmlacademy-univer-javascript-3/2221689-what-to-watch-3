import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Starring from './starring';
import { mockFilm } from '../../mocks/mock-full-film';

describe('Component: Starring', () => {
  it('should render correctly', () => {
    const starTestId = 'star';
    const preparedComponent = withHistory(<Starring star={mockFilm.starring[0]}/>);

    render(preparedComponent);

    expect(screen.getByTestId(starTestId)).toBeInTheDocument();
  });
});
