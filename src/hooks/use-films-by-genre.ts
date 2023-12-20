import { DEFAULT_GENRE } from '../const';
import { useAppSelector } from '.';
import { getGenre } from '../store/film-data/selectors';
import { FilmCardType } from '../types/film-card.type';

export default function useFilmsByGenre(films: FilmCardType[]): FilmCardType[] {
  const genre = useAppSelector(getGenre);
  const filmsByGenre = genre === DEFAULT_GENRE ? films :
    films.filter((film) => film.genre === genre);
  return filmsByGenre;
}
