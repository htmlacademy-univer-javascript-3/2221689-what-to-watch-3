import { FilmCardProps } from './film-card.props';
import { TReview } from './review.props';

export type MoviePageProps = {
  filmCards: FilmCardProps[];
  reviews: TReview[];
}
