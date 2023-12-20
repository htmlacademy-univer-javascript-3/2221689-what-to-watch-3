import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import UserBlock from './user-block';

describe('Component: UserBlock', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<UserBlock />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
