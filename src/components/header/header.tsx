import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  return (
    <header className="page-header film-card__head">
      <Logo/>
      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoute.Main} onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            className="user-block__link"
            >Sign out
            </Link>
          </li>
        </ul> :
        <div className="user-block">
          <Link to={'/login'} className="user-block__link">Sign in</Link>
        </div>}
    </header>
  );
}

export default Header;
