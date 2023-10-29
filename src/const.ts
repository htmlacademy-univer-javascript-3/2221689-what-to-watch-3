export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ratingMap = {
  '10': 'Awesome',
  '9': 'Very good',
  '8': 'Very good',
  '7': 'Good',
  '6': 'Good',
  '5': 'Good',
  '4': 'Normal',
  '3': 'Normal',
  '2': 'Bad',
  '1': 'Bad'
};

export const months = {
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

export const FilmInfoLink = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews'
};
