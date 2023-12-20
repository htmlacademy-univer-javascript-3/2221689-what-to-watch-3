import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const copyrightTestId = 'copyright';
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByTestId(copyrightTestId)).toBeInTheDocument();
  });
});
