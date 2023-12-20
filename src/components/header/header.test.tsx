import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import Header from './header';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component: Header', () => {
  it('should render correctly when user is logged in', () => {
    const { withStoreComponent } = withStore(withHistory(<Header/>), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render correctly when user is not logged in', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {[NameSpace.User]: {...fakeStore[NameSpace.User], authorizationStatus: AuthorizationStatus.NoAuth}};
    const { withStoreComponent } = withStore(withHistory(<Header/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
