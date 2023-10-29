import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  filmCards: FilmCardProps[];
}

function FilmsList({ filmCards }: FilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {filmCards.map((filmCard) => (
        <FilmCard key={filmCard.id} {...filmCard} />
      )
      )}
    </div>
  );
}

export default FilmsList;
