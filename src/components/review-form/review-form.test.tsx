import { screen, render } from '@testing-library/react';
import { extractActionsTypes, withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import ReviewForm from './review-form';
import { NameSpace, RatingValues } from '../../const';
import userEvent from '@testing-library/user-event';
import { reviewAction } from '../../store/api-actions';

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<ReviewForm/>), makeFakeStore());
    const reviewTestId = 'textarea-review';

    render(withStoreComponent);

    RatingValues.forEach((rating) => {
      expect(screen.getByLabelText(`Rating ${rating}`)).toBeInTheDocument();
    });
    expect(screen.getByText('Post')).toBeInTheDocument();
    expect(screen.getByTestId(reviewTestId)).not.toBeDisabled();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should reveiw form disabled when form is sent ', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = {...fakeStore, [NameSpace.Comments]: {...fakeStore[NameSpace.Comments], reviewsPostFetchingStatus: 'Pending'}};
    const reviewTestId = 'textarea-review';
    const { withStoreComponent } = withStore(withHistory(<ReviewForm/>), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByTestId(reviewTestId)).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render correctly when user enter review', async () => {
    const { withStoreComponent } = withStore(withHistory(<ReviewForm/>), makeFakeStore());
    const reviewTestId = 'textarea-review';
    const expectedReviewValue = 'keks';

    render(withStoreComponent);
    await userEvent.type(
      screen.getByTestId(reviewTestId),
      expectedReviewValue,
    );

    expect(screen.getByDisplayValue(expectedReviewValue)).toBeInTheDocument();
  });

  it('should dispatch "reviewAction" when user clicked on button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(withHistory(<ReviewForm/>), makeFakeStore());

    render(withStoreComponent);
    mockAxiosAdapter.onPost('comments/1').reply(400);
    await userEvent.click(screen.getAllByTestId('rating')[3]);
    await userEvent.type(
      screen.getByPlaceholderText('Review text'),
      'The length of the review should at least 50 and no more than 400 characters.'
    );
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      reviewAction.pending.type,
      reviewAction.rejected.type,
    ]);

  });
});
