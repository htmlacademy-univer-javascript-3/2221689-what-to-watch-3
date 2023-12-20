import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import RelatedFilms from './related-films';
import { mockFilm } from '../../mocks/mock-full-film';
import { mockPreviewFilmCards } from '../../mocks/mock-preview-film-cards';
import { NameSpace } from '../../const';

describe('Component: RelatedFilms', () => {
  it('should render correctly with films of the drama genre', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {[NameSpace.Films]: {...fakeStore[NameSpace.Films], film: mockFilm, filmCards: mockPreviewFilmCards}};
    const { withStoreComponent } = withStore(withHistory(<RelatedFilms filmCard={mockFilm}/>), newFakeStore);

    render(withStoreComponent);

    mockPreviewFilmCards.forEach((film) => {
      expect(screen.getByText(film.name)).toBeInTheDocument();
    });
  });

  it('should render correctly when related films is loading', () => {
    const expectedText = 'Loading...';
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], relatedFilmsFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<RelatedFilms filmCard={mockFilm}/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when related films is not loading', () => {
    const expectedText = 'Loading error';
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], relatedFilmsFetchingStatus: 'Error'}};
    const { withStoreComponent } = withStore(withHistory(<RelatedFilms filmCard={mockFilm}/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
