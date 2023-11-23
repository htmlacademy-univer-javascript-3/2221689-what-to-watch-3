import {NameSpace} from '../../const';

import {AuthorizationStatus} from '../../const';
import { State } from '../../types/state.props';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
