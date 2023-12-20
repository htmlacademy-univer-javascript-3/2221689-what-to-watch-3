import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-info.props';
import { UserProcess } from '../../types/state.props';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    authInfo: {} as AuthInfo
  };

  const fakeAuthInfo = {
    name: 'Oliver.conner',
    avatarUrl: 'https://url-to-image/image.jpg',
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  describe('checkAuthAction', () => {
    it('should set "authorizationStatus" to "NO_AUTH" with "checkAuthAction.rejected', () => {
      const expectedState = { ...initialState, authorizationStatus: 'NO_AUTH' };

      const result = userProcess.reducer(initialState, checkAuthAction.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "authorizationStatus" to "AUTH" and payload on "authInfo" with "checkAuthAction.fulfilled', () => {
      const expectedState = { ...initialState, authorizationStatus: 'AUTH', authInfo: fakeAuthInfo };

      const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(fakeAuthInfo, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction', () => {
    it('should set "authorizationStatus" to "NO_AUTH" with "loginAction.rejected', () => {
      const expectedState = { ...initialState, authorizationStatus: 'NO_AUTH' };

      const result = userProcess.reducer(initialState, loginAction.rejected);

      expect(result).toEqual(expectedState);
    });

    it('should set "authorizationStatus" to "AUTH" and payload on "authInfo" with "loginAction.fulfilled', () => {
      const expectedState = { ...initialState, authorizationStatus: 'AUTH', authInfo: fakeAuthInfo };

      const result = userProcess.reducer(initialState, loginAction.fulfilled(fakeAuthInfo, '', {login: '', password: ''}));

      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should set "authorizationStatus" to "NO_AUTH" with "logoutAction.fulfilled', () => {
      const expectedState = { ...initialState, authorizationStatus: 'NO_AUTH' };

      const result = userProcess.reducer(initialState, logoutAction.fulfilled(undefined, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });
});
