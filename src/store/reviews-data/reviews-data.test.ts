import { RequestStatus } from '../../const';
import { mockReviews } from '../../mocks/mock-reviews';
import { ReviewData } from '../../types/state.props';
import { fetchReviews, reviewAction } from '../api-actions';
import { addReview, reviewData } from './reviews-data';

describe('ReviewsData Slice', () => {
  const initialState: ReviewData = {
    reviews: [],
    reviewsFetchingStatus: RequestStatus.Idle,
    reviewsPostFetchingStatus: RequestStatus.Idle
  };

  describe('addReview', () => {
    it('should add review to reviews', () => {
      const result = reviewData.reducer(initialState, addReview(mockReviews[0]));

      expect(result.reviews).toEqual(mockReviews);
    });
  });

  describe('fetchReviews', () => {
    it('should set "reviewsFetchingStatus" to "Error" with "fetchReviews.rejected', () => {
      const expectedState = { ...initialState, reviewsFetchingStatus: 'Error' };

      const result = reviewData.reducer(initialState, fetchReviews.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviewsFetchingStatus" to "Pending" with "fetchReviews.pending', () => {
      const expectedState = { ...initialState, reviewsFetchingStatus: 'Pending' };

      const result = reviewData.reducer(initialState, fetchReviews.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviewsFetchingStatus" to "fulfilled" and payload on "reviews" with "fetchReviews.fulfilled', () => {
      const expectedState = { ...initialState, reviewsFetchingStatus: 'Success', reviews: mockReviews };

      const result = reviewData.reducer(initialState, fetchReviews.fulfilled(mockReviews, '', {filmId: ''}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('reviewAction', () => {
    it('should set "reviewsPostFetchingStatus" to "Error" with "reviewAction.rejected', () => {
      const expectedState = { ...initialState, reviewsPostFetchingStatus: 'Error' };

      const result = reviewData.reducer(initialState, reviewAction.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviewsPostFetchingStatus" to "Pending" with "reviewAction.pending', () => {
      const expectedState = { ...initialState, reviewsPostFetchingStatus: 'Pending' };

      const result = reviewData.reducer(initialState, reviewAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "reviewsPostFetchingStatus" to "fulfilled" with "reviewAction.fulfilled', () => {
      const expectedState = { ...initialState, reviewsPostFetchingStatus: 'Success'};

      const result = reviewData.reducer(initialState, reviewAction.fulfilled);

      expect(result).toEqual(expectedState);
    });
  });
});
