import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthInfo, getAuthorizationStatus } from '../../store/user-process/selectors';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authInfo = useAppSelector(getAuthInfo);
  const dispatch = useAppDispatch();

  return (
    <header className="page-header film-card__head">
      <Logo/>
      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={AppRoute.MyList}><img src={authInfo.avatarUrl} alt="User avatar" width="63" height="63" /></Link>
            </div>
          </li>
          <li className="user-block__item">
            <Link data-testid="header-link" to={AppRoute.Main} onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            className="user-block__link"
            >Sign out
            </Link>
          </li>
        </ul> :
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>}
    </header>
  );
}

export default Header;
