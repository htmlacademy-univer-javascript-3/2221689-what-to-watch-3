import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../mocks/mock-component';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { render, screen } from '@testing-library/react';
import { fakeAuthInfo, makeFakeStore } from '../../mocks/mock-store';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, {...fakeStore, USER: { authInfo: fakeAuthInfo, authorizationStatus: AuthorizationStatus.NoAuth }});
    mockHistory.push(AppRoute.SignIn);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/films/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Film);

    render(withStoreComponent);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.AddReview);

    render(withStoreComponent);

    expect(screen.getByLabelText(/Rating 2/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.Player);

    render(withStoreComponent);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to "/404"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistoryComponent, fakeStore);
    mockHistory.push(AppRoute.NotFound);

    render(withStoreComponent);

    expect(screen.getByText(/404. Page was not found/i)).toBeInTheDocument();
  });
});
