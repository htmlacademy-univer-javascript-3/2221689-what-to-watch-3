import { NameSpace } from '../../const';
import { State } from '../../types/state.props';

export const getReviews = (state: State) => state[NameSpace.Comments].reviews;
export const getReviewsFetchingStatus = (state: State): string => state[NameSpace.Comments].reviewsFetchingStatus;
