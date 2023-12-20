import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGenre } from '../../store/film-data/selectors';
import { changeGenre } from '../../store/film-data/film-data';

type GenreListProps = {
    genres: string[];
    onClickGenre: () => void;
}

function GenreList({ genres, onClickGenre }: GenreListProps) {
  const dispatch = useAppDispatch();
  const activeGenre = useAppSelector(getGenre);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre: string) => (
        <li data-testid={`genre-${genre}`} key={genre} className={classNames('catalog__genres-item', activeGenre === genre && 'catalog__genres-item--active')}>
          <a data-testid={`genre-${genre}-click`} onClick={() => {
            dispatch(changeGenre({ genre }));
            onClickGenre();
          }} className="catalog__genres-link"
          >{genre}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
