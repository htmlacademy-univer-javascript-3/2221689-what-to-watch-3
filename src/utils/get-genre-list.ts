import { DEFAULT_GENRE } from '../const';
import { FilmCardProps } from '../types/film-card.props';

export default function getGenreList(filmCards: FilmCardProps[]) {
  const genreList: string[] = [];
  filmCards.forEach((filmCard) => {
    if (!genreList.includes(filmCard.genre)) {
      genreList.push(filmCard.genre);
    }
  });
  genreList.sort().unshift(DEFAULT_GENRE);
  return genreList;
}
