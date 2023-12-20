import { DEFAULT_GENRE } from '../const';
import { FilmCardType } from '../types/film-card.type';

export default function getGenreList(filmCards: FilmCardType[]) {
  const genreList: string[] = [];
  filmCards.forEach((filmCard) => {
    if (!genreList.includes(filmCard.genre)) {
      genreList.push(filmCard.genre);
    }
  });
  genreList.sort().unshift(DEFAULT_GENRE);
  return genreList;
}
