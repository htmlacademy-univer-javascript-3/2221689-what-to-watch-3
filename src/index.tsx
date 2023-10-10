import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { PromoFilm } from './const';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App titleFilm={PromoFilm.TitleFilm} genreFilm={PromoFilm.GenreFilm} yearFilm={PromoFilm.YearFilm}/>
  </React.StrictMode>
);
