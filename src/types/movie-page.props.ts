import { FilmCardProps } from './film-card.props';
import { ReviewProps } from './review.props';

export type MoviePageProps = {
  filmCards: FilmCardProps[];
  reviews: ReviewProps[];
}
