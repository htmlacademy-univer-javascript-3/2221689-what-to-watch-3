import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MyList}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
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
