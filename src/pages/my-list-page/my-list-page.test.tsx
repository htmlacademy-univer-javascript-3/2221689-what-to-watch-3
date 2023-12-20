import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import MyListPage from './my-list-page';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { NameSpace } from '../../const';

describe('Component: MyListPage', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistory(<MyListPage />), fakeStore);

    render(withStoreComponent);

    mockPreviewFilmCards.forEach((film) => {
      expect(screen.getByText(film.name)).toBeInTheDocument();
    });
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(fakeStore.MYLIST.favoriteFilmsCount)).toBeInTheDocument();
  });

  it('should render correctly when favorite films is loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = { ...fakeStore, [NameSpace.MyList]: { ...fakeStore[NameSpace.MyList], favoriteFilmsFetchingStatus: 'Pending' } };
    const { withStoreComponent } = withStore(withHistory(<MyListPage />), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render correctly when favorite films were not loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = { ...fakeStore, [NameSpace.MyList]: { ...fakeStore[NameSpace.MyList], favoriteFilmsFetchingStatus: 'Error' } };
    const { withStoreComponent } = withStore(withHistory(<MyListPage />), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading error')).toBeInTheDocument();
  });
});
