import { FilmCardType } from '../types/film-card.type';

export default function getCurrentFilms(filmCards: FilmCardType[], filmCount: number | undefined) {
  return filmCount ? filmCards.slice(0, filmCount) : filmCards;
}
