import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { InfoFilm } from './const';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App titleFilm={InfoFilm.TitleFilm} genreFilm={InfoFilm.GenreFilm} yearFilm={InfoFilm.YearFilm}/>
  </React.StrictMode>
);
