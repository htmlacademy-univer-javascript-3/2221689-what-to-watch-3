export const filmCards = [
  {
    id: 0,
    srcImage: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    title: 'Fantastic Beasts: The Crimes of Grindelwald'
  },
  {
    id: 1,
    srcImage: 'img/bohemian-rhapsody.jpg',
    title: 'Bohemian Rhapsody'
  },
  {
    id: 2,
    srcImage: 'img/macbeth.jpg',
    title: 'Macbeth'
  },
  {
    id: 3,
    srcImage: 'img/aviator.jpg',
    title: 'Aviator'
  },
  {
    id: 4,
    srcImage: 'img/we-need-to-talk-about-kevin.jpg',
    title: 'We need to talk about Kevin'
  },
  {
    id: 5,
    srcImage: 'img/what-we-do-in-the-shadows.jpg',
    title: 'What We Do in the Shadows'
  },
  {
    id: 6,
    srcImage: 'img/revenant.jpg',
    title: 'Revenant'
  },
  {
    id: 7,
    srcImage: 'img/johnny-english.jpg',
    title: 'Johnny English'
  },
  {
    id: 8,
    srcImage: 'img/shutter-island.jpg',
    title: 'Shutter Island'
  },
  {
    id: 9,
    srcImage: 'img/pulp-fiction.jpg',
    title: 'Pulp Fiction'
  },
  {
    id: 10,
    srcImage: 'img/no-country-for-old-men.jpg',
    title: 'No Country for Old Men'
  },
  {
    id: 11,
    srcImage: 'img/snatch.jpg',
    title: 'Snatch'
  },
  {
    id: 12,
    srcImage: 'img/moonrise-kingdom.jpg',
    title: 'Moonrise Kingdom'
  },
  {
    id: 13,
    srcImage: 'img/seven-years-in-tibet.jpg',
    title: 'Seven Years in Tibe'
  },
  {
    id: 14,
    srcImage: 'img/midnight-special.jpg',
    title: 'Midnight Special'
  },
  {
    id: 15,
    srcImage: 'img/war-of-the-worlds.jpg',
    title: 'War of the Worlds'
  },
  {
    id: 16,
    srcImage: 'img/dardjeeling-limited.jpg',
    title: 'Dardjeeling Limited'
  },
  {
    id: 17,
    srcImage: 'img/orlando.jpg',
    title: 'Orlando'
  },
  {
    id: 18,
    srcImage: 'img/mindhunter.jpg',
    title: 'Mindhunter'
  },
  {
    id: 19,
    srcImage: 'img/midnight-special.jpg',
    title: 'Midnight Special'
  }
];

export const PromoFilm = {
  TitleFilm: 'The Grand Budapest Hotel',
  GenreFilm: 'Drama',
  YearFilm: '2014'
};

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

