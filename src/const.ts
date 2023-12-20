export const AppRoute = {
  Main: '/',
  SignIn: '/login',
  MyList: '/mylist',
  Film: '/films/:id',
  AddReview: '/films/:id/review',
  Player: '/player/:id',
  NotFound: '/404'
};

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RatingValues = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

export const Months = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export const TabsInfo = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews'
};

export const APIRoute = {
  Films: '/films',
  Login: '/login',
  Logout: '/logout',
  Favorite: '/favorite',
  Comments: '/comments',
  Promo: '/promo'
};

export const RequestStatus = {
  Idle: 'Idle',
  Pending: 'Pending',
  Success: 'Success',
  Error: 'Error'
};

export const MAX_COUNT_SHOWN_FILMS = 8;

export const DEFAULT_GENRE = 'All genres';

export const SECONDS_IN_HOUR = 3600;

export const SECONDS_IN_MINUTE = 60;

export const HOUR_MINUTES_COUNT = 60;

export const CommentLength = {
  Max: 400,
  Min: 50
};

export enum NameSpace {
  Films = 'FILMS',
  Comments = 'COMMENTS',
  User = 'USER',
  MyList = 'MYLIST'
}
