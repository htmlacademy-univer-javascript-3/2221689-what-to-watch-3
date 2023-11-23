import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGenre } from '../../store/film-data/selectors';
import { changeGenre, setDefaultCountShownFilms } from '../../store/film-data/film-data';

type GenreList = {
    genres: string[];
}

function GenreList({ genres }: GenreList) {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getGenre);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li key={genre} className={classNames('catalog__genres-item', activeGenre === genre && 'catalog__genres-item--active')}>
          <a onClick={() => {
            dispatch(changeGenre({ genre }));
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
