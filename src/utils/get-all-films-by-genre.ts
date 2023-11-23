import { DEFAULT_GENRE } from '../const';
import { useAppSelector } from '../hooks';
import { getGenre } from '../store/film-data/selectors';
import { FilmCardProps } from '../types/film-card.props';

export default function useFilmsByGenre(films: FilmCardProps[]) {
  const genre = useAppSelector(getGenre);
  const filmsByGenre = genre === DEFAULT_GENRE ? films :
    films.filter((film) => film.genre === genre);
  return filmsByGenre;
}
