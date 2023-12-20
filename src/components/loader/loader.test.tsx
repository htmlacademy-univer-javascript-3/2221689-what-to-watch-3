import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import { Loader } from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const expectedText = 'Loading...';
    const preparedComponent = withHistory(<Loader />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
