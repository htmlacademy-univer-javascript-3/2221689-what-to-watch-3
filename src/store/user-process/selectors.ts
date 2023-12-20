import {NameSpace} from '../../const';
import {AuthorizationStatus} from '../../const';
import { AuthInfo } from '../../types/auth-info.props';
import { State } from '../../types/state.props';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthInfo = (state: Pick<State, NameSpace.User>): AuthInfo => state[NameSpace.User].authInfo;
