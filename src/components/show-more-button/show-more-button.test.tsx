import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import ShowMoreButton from './show-more-button';
import userEvent from '@testing-library/user-event';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    const mockHandleClick = vi.fn();
    const expectedText = 'Show more';
    const preparedComponent = withHistory(<ShowMoreButton onClick={mockHandleClick}/>);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('onClick should called when user wants to show more movies', async () => {
    const mockHandleClick = vi.fn();
    const preparedComponent = withHistory(<ShowMoreButton onClick={mockHandleClick}/>);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHandleClick).toBeCalled();
  });
});
