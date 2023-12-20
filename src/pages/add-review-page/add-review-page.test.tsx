import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import AddReviewPage from './add-review-page';
import { NameSpace, RatingValues } from '../../const';

describe('Component: AddReviewPage', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<AddReviewPage/>), makeFakeStore());

    render(withStoreComponent);

    RatingValues.forEach((rating) => {
      expect(screen.getByLabelText(`Rating ${rating}`)).toBeInTheDocument();
    });
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render page "FilmNotFoundErrorPage" if film is not found', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], filmFetchingStatus: 'Error'}};
    const { withStoreComponent } = withStore(withHistory(<AddReviewPage/>), newFakeStore);
    const expectedText = 'Film was not found';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render component "Loading" if film is loading', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Films]: {...fakeStore[NameSpace.Films], filmFetchingStatus: 'Pending'}};
    const { withStoreComponent } = withStore(withHistory(<AddReviewPage/>), newFakeStore);
    const expectedText = 'Loading...';

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
