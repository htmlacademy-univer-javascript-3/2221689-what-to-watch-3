import { AuthorizationStatus, NameSpace } from '../../const';
import { getAuthInfo, getAuthorizationStatus } from './selectors';

describe('UserProcess selectors', () => {
  const fakeAuthInfo = {
    name: 'Oliver.conner',
    avatarUrl: 'https://url-to-image/image.jpg',
    email: 'Oliver.conner@gmail.com',
    token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  };

  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: fakeAuthInfo
    }
  };

  describe('authorizationStatus', () => {
    it('should return authorizationStatus from state', () => {
      const { authorizationStatus } = state[NameSpace.User];

      const result = getAuthorizationStatus(state);

      expect(result).toBe(authorizationStatus);
    });
  });

  describe('authInfo', () => {
    it('should return authInfo from state', () => {
      const { authInfo } = state[NameSpace.User];

      const result = getAuthInfo(state);

      expect(result).toBe(authInfo);
    });
  });
});
