import { useAppDispatch } from '../../hooks';
import { changeCountShownFilms } from '../../store/actions';

function ShowMoreButton() {
  const dispatch = useAppDispatch();
  return (
    <div className="catalog__more">
      <button onClick={() => dispatch(changeCountShownFilms())} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreButton;
