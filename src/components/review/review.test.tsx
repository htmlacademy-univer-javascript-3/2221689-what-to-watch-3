import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Review from './review';
import { mockReviews } from '../../mocks/mock-reviews';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Review review={mockReviews[0]}/>);

    render(preparedComponent);

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].rating)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].user)).toBeInTheDocument();
  });
});
