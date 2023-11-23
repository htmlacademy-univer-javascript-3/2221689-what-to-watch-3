import { useAppDispatch } from '../../hooks';
import { changeCountShownFilms } from '../../store/film-data/film-data';

function ShowMoreButton() {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(changeCountShownFilms());
  return (
    <div className="catalog__more">
      <button onClick={handleClick} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreButton;
