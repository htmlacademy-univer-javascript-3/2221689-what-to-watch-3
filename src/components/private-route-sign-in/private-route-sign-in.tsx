import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteSignInProps = {
    authorizationStatus: string;
    children: JSX.Element;
}

function PrivateRouteSignIn({ authorizationStatus, children }: PrivateRouteSignInProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}

export default PrivateRouteSignIn;
