import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404. Page was not found';
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
