import { FilmCardProps } from './film-card.props';
import { PromoFilmProps } from './promo-film.props';

export type MainPageProps = {
  promoFilm: PromoFilmProps;
  filmCards: FilmCardProps[];
}
