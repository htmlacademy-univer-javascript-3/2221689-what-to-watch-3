import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Tabs from './tabs';
import { mockFilm } from '../../mocks/mock-full-film';

describe('Component: Tabs', () => {
  it('should render correctly when tab is "Overview"', () => {
    const preparedComponent = withHistory(<Tabs filmCard={mockFilm}/>);

    render(preparedComponent);

    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
  });

  it('should add active class when tab "Overview" is active', () => {
    const preparedComponent = withHistory(<Tabs filmCard={mockFilm}/>);
    const overviewTestId = 'tab-overview';

    render(preparedComponent);

    expect(screen.getByTestId(overviewTestId)).toHaveClass('film-nav__item--active');
  });
});

