import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logoTestId = 'logo';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByTestId(logoTestId)).toBeInTheDocument();
  });
});
