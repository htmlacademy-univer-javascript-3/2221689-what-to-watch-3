import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getReviews = (state: Pick<State, NameSpace.Comments>) => state[NameSpace.Comments].reviews;
export const getReviewsFetchingStatus = (state: Pick<State, NameSpace.Comments>): string => state[NameSpace.Comments].reviewsFetchingStatus;
export const getReviewsPostFetchingStatus = (state: Pick<State, NameSpace.Comments>): string => state[NameSpace.Comments].reviewsPostFetchingStatus;

