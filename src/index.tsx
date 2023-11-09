import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { promoFilm } from './mocks/promo-film';
import { filmCards } from './mocks/films';
import { reviews } from './mocks/reviews';
import { Provider } from 'react-redux';
import { store } from './store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilm={promoFilm} filmCards={filmCards} reviews={reviews}/>
    </Provider>
  </React.StrictMode>
);
