import { NameSpace, RequestStatus } from '../../const';
import { mockReviews } from '../../mocks/mock-reviews';
import { getReviews, getReviewsFetchingStatus, getReviewsPostFetchingStatus } from './selectors';

describe('ReviewsData selectors', () => {
  const state = {
    [NameSpace.Comments]: {
      reviews: mockReviews,
      reviewsFetchingStatus: RequestStatus.Idle,
      reviewsPostFetchingStatus: RequestStatus.Idle
    }
  };

  describe('reviews', () => {
    it('should return reviews from state', () => {
      const { reviews } = state[NameSpace.Comments];

      const result = getReviews(state);

      expect(result).toBe(reviews);
    });

    it('should return reviewsFetchingStatus from state', () => {
      const { reviewsFetchingStatus } = state[NameSpace.Comments];

      const result = getReviewsFetchingStatus(state);

      expect(result).toBe(reviewsFetchingStatus);
    });
  });

  describe('reviewsPostFetchingStatus', () => {
    it('should return reviewsPostFetchingStatus from state', () => {
      const { reviewsPostFetchingStatus } = state[NameSpace.Comments];

      const result = getReviewsPostFetchingStatus(state);

      expect(result).toBe(reviewsPostFetchingStatus);
    });
  });
});
