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
  '1': 'Bad',
  '0': 'Bad'
};
