import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import MainPage from './main-page';
import { mockPromoFilm } from '../../mocks/mock-promo-film';
import { NameSpace } from '../../const';

describe('Component: MainPage', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistory(<MainPage />), fakeStore);

    render(withStoreComponent);

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeStore.MYLIST.favoriteFilmsCount)).toBeInTheDocument();
  });

  it('should render correctly when promo film is loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], promoFilmFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<MainPage/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render correctly when promo film was not loaded', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], promoFilmFetchingStatus: 'Error'}};
    const { withStoreComponent } = withStore(withHistory(<MainPage/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading error')).toBeInTheDocument();
  });

  it('should render correctly when films is loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], filmsFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<MainPage/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render correctly when films were not loaded', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], filmsFetchingStatus: 'Error'}};
    const { withStoreComponent } = withStore(withHistory(<MainPage/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading error')).toBeInTheDocument();
  });
});
