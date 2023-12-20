import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state.props';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../mocks/mock-component';
import { APIRoute, DEFAULT_GENRE, NameSpace, RequestStatus } from '../const';
import { changeFavoriteFilms, checkAuthAction, fetchFavoriteFilms, fetchFilm, fetchFilms, fetchPromoFilm, fetchReleatedFilms, fetchReviews, loginAction, logoutAction, reviewAction } from './api-actions';
import { AuthData } from '../types/auth-data.props';
import { redirectToRoute } from './actions';
import * as tokenStorage from '../services/token';
import { mockPreviewFilmCards } from '../mocks/mock-preview-film-cards';
import { mockFilm } from '../mocks/mock-full-film';
import { mockReviews } from '../mocks/mock-reviews';
import { mockPromoFilm } from '../mocks/mock-promo-film';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  const fakeAuthInfo = {
    name: 'Oliver.conner',
    avatarUrl: 'https://url-to-image/image.jpg',
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Films]: {
        genre: DEFAULT_GENRE,
        filmCards: [],
        film: undefined,
        filmsFetchingStatus: RequestStatus.Idle,
        filmFetchingStatus: RequestStatus.Idle,
        relatedFilms: [],
        relatedFilmsFetchingStatus: RequestStatus.Idle,
        promoFilm: undefined,
        promoFilmFetchingStatus: RequestStatus.Idle
      },
      [NameSpace.MyList]: {
        favoriteFilms: [],
        favoriteFilmsCount: 0,
        favoriteFilmsFetchingStatus: RequestStatus.Idle,
        changeFavoriteFilmsFetchingStatus: RequestStatus.Idle
      },
      [NameSpace.Comments]: {
        reviews: [],
        reviewsFetchingStatus: RequestStatus.Idle,
        reviewsPostFetchingStatus: RequestStatus.Idle
      }
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" when success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, fakeAuthInfo);

      await store.dispatch(checkAuthAction());
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const checkAuthFulfilled = emittedActions.at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);

      expect(checkAuthFulfilled.payload).toStrictEqual(fakeAuthInfo);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when success', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const loginActionFulfilled = emittedActions.at(2) as ReturnType<typeof loginAction.fulfilled>;

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);

      expect(loginActionFulfilled.payload).toStrictEqual(fakeServerReplay);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when failed', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchFilms', () => {
    it('should dispatch "fetchFilms.pending", "fetchFilms.fulfilled", when success', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, mockPreviewFilmCards);

      await store.dispatch(fetchFilms());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilms.pending.type,
        fetchFilms.fulfilled.type,
      ]);
      expect(fetchFilmsFulfilled.payload)
        .toEqual(mockPreviewFilmCards);
    });

    it('should dispatch "fetchFilms.pending", "fetchFilms.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(400, []);

      await store.dispatch(fetchFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilms.pending.type,
        fetchFilms.rejected.type,
      ]);
    });
  });

  describe('fetchFilm', () => {
    it('should dispatch "fetchFilm.pending", "fetchFilm.fulfilled", when success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(200, mockFilm);

      await store.dispatch(fetchFilm({filmId: id}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFilm.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFilm.pending.type,
        fetchFilm.fulfilled.type,
      ]);
      expect(fetchFilmFulfilled.payload)
        .toEqual(mockFilm);
    });

    it('should dispatch "fetchFilm.pending", "fetchFilm.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${''}`).reply(400, []);

      await store.dispatch(fetchFilm({filmId: ''}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilm.pending.type,
        fetchFilm.rejected.type,
      ]);
    });
  });

  describe('fetchReleatedFilms', () => {
    it('should dispatch "fetchReleatedFilms.pending", "fetchReleatedFilms.fulfilled", when success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}/similar`).reply(200, mockPreviewFilmCards);

      await store.dispatch(fetchReleatedFilms({filmId: id}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReleatedFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReleatedFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReleatedFilms.pending.type,
        fetchReleatedFilms.fulfilled.type,
      ]);
      expect(fetchReleatedFilmsFulfilled.payload)
        .toEqual(mockPreviewFilmCards);
    });

    it('should dispatch "fetchReleatedFilms.pending", "fetchReleatedFilms.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${''}/similar`).reply(400, []);

      await store.dispatch(fetchReleatedFilms({filmId: ''}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReleatedFilms.pending.type,
        fetchReleatedFilms.rejected.type,
      ]);
    });
  });

  describe('fetchReviews', () => {
    it('should dispatch "fetchReviews.pending", "fetchReviews.fulfilled", when success', async () => {
      const id = crypto.randomUUID();
      mockAxiosAdapter.onGet(`comments/${id}`).reply(200, mockReviews);

      await store.dispatch(fetchReviews({filmId: id}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviews.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviews.pending.type,
        fetchReviews.fulfilled.type,
      ]);
      expect(fetchReviewsFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviews.pending", "fetchReviews.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`comments/${''}`).reply(400, []);

      await store.dispatch(fetchReviews({filmId: ''}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviews.pending.type,
        fetchReviews.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilm', () => {
    it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.fulfilled", when success', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Promo}`).reply(200, mockPromoFilm);

      await store.dispatch(fetchPromoFilm());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoFilm.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.fulfilled.type,
      ]);
      expect(fetchPromoFilmFulfilled.payload)
        .toEqual(mockPromoFilm);
    });

    it('should dispatch "fetchPromoFilm.pending", "fetchPromoFilm.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Promo}`).reply(400, []);

      await store.dispatch(fetchPromoFilm());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilm.pending.type,
        fetchPromoFilm.rejected.type,
      ]);
    });
  });

  describe('fetchFavoriteFilms', () => {
    it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.fulfilled", when success', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, mockPreviewFilmCards);

      await store.dispatch(fetchFavoriteFilms());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoriteFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchFavoriteFilms.pending.type,
        fetchFavoriteFilms.fulfilled.type,
      ]);
      expect(fetchFavoriteFilmsFulfilled.payload)
        .toEqual(mockPreviewFilmCards);
    });

    it('should dispatch "fetchFavoriteFilms.pending", "fetchFavoriteFilms.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(400, []);

      await store.dispatch(fetchFavoriteFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteFilms.pending.type,
        fetchFavoriteFilms.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteFilms', () => {
    it('should dispatch "changeFavoriteFilms.pending", "changeFavoriteFilms.fulfilled", when success', async () => {
      const id = crypto.randomUUID();
      const expectedResponse = {...mockFilm, isFavorite: true};
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${id}/${1}`).reply(200, expectedResponse);

      await store.dispatch(changeFavoriteFilms({filmId: id, status: 1}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteFilmsFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoriteFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteFilms.pending.type,
        changeFavoriteFilms.fulfilled.type,
      ]);

      expect(changeFavoriteFilmsFulfilled.payload)
        .toEqual(1);
    });

    it('should dispatch "changeFavoriteFilms.pending", "changeFavoriteFilms.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}/${''}/${''}`).reply(400, []);

      await store.dispatch(changeFavoriteFilms({filmId: '', status: 1}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteFilms.pending.type,
        changeFavoriteFilms.rejected.type,
      ]);
    });
  });

  describe('reviewAction', () => {
    it('should dispatch "reviewAction.pending", "reviewAction.fulfilled", when success', async () => {
      const id = crypto.randomUUID();
      const dispatchAddReviewType = 'COMMENTS/addReview';
      mockAxiosAdapter.onPost(`comments/${id}`).reply(200, mockReviews[0]);

      await store.dispatch(reviewAction({filmId: id, comment: '', rating: 0}));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        reviewAction.pending.type,
        dispatchAddReviewType,
        reviewAction.fulfilled.type,
      ]);
    });

    it('should dispatch "reviewAction.pending", "reviewAction.rejected" when failed', async () => {
      mockAxiosAdapter.onGet(`comments/${''}`).reply(400, []);

      await store.dispatch(reviewAction({filmId: '', comment: '', rating: 0}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        reviewAction.pending.type,
        reviewAction.rejected.type,
      ]);
    });
  });
});
