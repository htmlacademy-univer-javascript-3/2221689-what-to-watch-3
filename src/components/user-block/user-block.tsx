import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthInfo } from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector(getAuthInfo);

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}><img src={authInfo.avatarUrl} alt="User avatar" width="63" height="63" /></Link>
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
    </ul>
  );
}

export default UserBlock;
