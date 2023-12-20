import { render, screen } from '@testing-library/react';
import { ErrorLoad } from './error-load';
import { withHistory } from '../../mocks/mock-component';

describe('Component: ErrorLoad', () => {
  it('should render correctly', () => {
    const expectedText = 'Loading error';
    const preparedComponent = withHistory(<ErrorLoad />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
