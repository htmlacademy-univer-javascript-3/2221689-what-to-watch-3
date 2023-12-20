import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import FilmReview from './film-review';
import { mockReviews } from '../../mocks/mock-reviews';
import { NameSpace } from '../../const';

describe('Component: FilmReview', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<FilmReview filmId=''/>), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[0].rating)).toBeInTheDocument();
  });

  it('should render correctly when reviews is loading', () => {
    const expectedText = 'Loading...';
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Comments]: {...fakeStore[NameSpace.Comments], reviewsFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<FilmReview filmId=''/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly when reviews is not loading', () => {
    const expectedText = 'Loading error';
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Comments]: {...fakeStore[NameSpace.Comments], reviewsFetchingStatus: 'Error'}};
    const { withStoreComponent } = withStore(withHistory(<FilmReview filmId=''/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
