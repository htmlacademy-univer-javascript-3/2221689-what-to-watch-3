import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilmsCount } from '../../store/my-list-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { APIRoute, AuthorizationStatus } from '../../const';
import { changeFavoriteFilms } from '../../store/api-actions';
import { useState } from 'react';

type FavoriteStatusButtonProps = {
    filmId: string;
    isFavorite: boolean;
}

function FavoriteStatusButton({filmId, isFavorite }: FavoriteStatusButtonProps): JSX.Element {
  const navigate = useNavigate();
  const favoriteFilmsCount = useAppSelector(getFavoriteFilmsCount);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isCurrentFavorite, setIsCurrentFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteFilms({filmId, status: Number(!isCurrentFavorite)}));
      setIsCurrentFavorite(!isCurrentFavorite);
    } else {
      navigate(`${APIRoute.Login}`);
    }
  }

  return (
    <button className="btn btn--list film-card__button" type="button"
      onClick={handleClick}
    >
      {isCurrentFavorite && authorizationStatus === AuthorizationStatus.Auth ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg> :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>My list</span>
      <span className="film-card__count">
        {authorizationStatus === AuthorizationStatus.Auth ? favoriteFilmsCount : 0}
      </span>
    </button>
  );
}

export default FavoriteStatusButton;

