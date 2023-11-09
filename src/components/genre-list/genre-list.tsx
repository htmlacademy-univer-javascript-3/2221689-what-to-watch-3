import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, getFilmCardsByGenre, setDefaultCountShownFilms } from '../../store/actions';

type GenreList = {
    genres: string[];
}

function GenreList({ genres }: GenreList) {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector((state) => state.genre);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li key={genre} className={classNames('catalog__genres-item', activeGenre === genre && 'catalog__genres-item--active')}>
          <a onClick={() => {
            dispatch(changeGenre({ genre }));
            dispatch(getFilmCardsByGenre());
            dispatch(setDefaultCountShownFilms());
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
