import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import MoviePage from './movie-page';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { mockFilm } from '../../mocks/mock-full-film';
import { AuthorizationStatus, NameSpace } from '../../const';

describe('Component: MoviePage', () => {
  it('should render correctly', () => {
    const filmDescription = `${mockFilm.description}`;
    const filmName = `${mockFilm.description}`;
    const fakeStore = makeFakeStore();
    const { withStoreComponent } = withStore(withHistory(<MoviePage />), fakeStore);

    render(withStoreComponent);

    mockPreviewFilmCards.forEach((film) => {
      expect(screen.getByText(film.name)).toBeInTheDocument();
    });
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(filmName)).toBeInTheDocument();
    expect(screen.getByText(filmDescription)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render correctly when film is loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], filmFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<MoviePage/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render button "Add review" when user is logged in', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.User]: {...fakeStore[NameSpace.User], authorizationStatus: AuthorizationStatus.Auth}};
    const { withStoreComponent } = withStore(withHistory(<MoviePage/>), newFakeStore);
    const addReviewLinkTestId = 'add-review-link';

    render(withStoreComponent);

    expect(screen.getByTestId(addReviewLinkTestId)).toBeInTheDocument();
  });
});
