import { screen, render } from '@testing-library/react';
import FavoriteStatusButton from './favorite-status-button';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import userEvent from '@testing-library/user-event';

describe('Component: FavoriteStatusButton', () => {
  it('should render correctly', () => {
    const mockId = '2';
    const mockIsFavorite = false;
    const { withStoreComponent } = withStore(withHistory(<FavoriteStatusButton filmId={mockId} isFavorite={mockIsFavorite} />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render icon "in-list" if user is logged in and film is added to favorites', () => {
    const mockId = '2';
    const mockIsFavorite = true;
    const inListTestId = 'in-list';
    const { withStoreComponent } = withStore(withHistory(<FavoriteStatusButton filmId={mockId} isFavorite={mockIsFavorite} />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(inListTestId)).toBeInTheDocument();
  });

  it('should render icon "add" if user is logged in and film is not added to favorites', () => {
    const mockId = '2';
    const mockIsFavorite = false;
    const addTestId = 'add';
    const { withStoreComponent } = withStore(withHistory(<FavoriteStatusButton filmId={mockId} isFavorite={mockIsFavorite} />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(addTestId)).toBeInTheDocument();
  });

  it('should change icon "add" to "in-list" when user clicked on button if film was not in favorites', async () => {
    const mockId = '2';
    const mockIsFavorite = false;
    const inListTestId = 'in-list';
    const { withStoreComponent } = withStore(withHistory(<FavoriteStatusButton filmId={mockId} isFavorite={mockIsFavorite} />), makeFakeStore());

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(inListTestId)).toBeInTheDocument();
  });
});

