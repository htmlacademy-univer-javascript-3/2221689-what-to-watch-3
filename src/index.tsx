import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthAction, fetchFilms } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilms());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <ToastContainer />
      <App />
    </HistoryRouter>
  </Provider>
);
