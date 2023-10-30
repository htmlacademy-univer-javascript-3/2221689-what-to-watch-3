import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';

type RelatedFilmsProps = {
    filmCards: FilmCardProps[];
    filmCard: FilmCardProps;
}

function RelatedFilms({ filmCards, filmCard }: RelatedFilmsProps): JSX.Element {
  const filteredFilmGenre = filmCards.filter((filmCardItem) => (filmCardItem.genre === filmCard.genre) && (filmCardItem !== filmCard));
  return (
    <div className="catalog__films-list">
      {filteredFilmGenre.map((filmCardItem) => (
        <article key={filmCardItem.id} className="small-film-card catalog__films-card">
          <FilmCard {...filmCardItem} />
        </article>
      )
      )}
    </div>
  );
}

export default RelatedFilms;
