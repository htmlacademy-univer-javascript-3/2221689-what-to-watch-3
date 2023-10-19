import { FilmsListProps } from '../../types/films-list.props';
import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';
import { useState } from 'react';

function FilmsList({ filmCards }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(filmCards[0]);

  return (
    <div className="catalog__films-list">
      {filmCards.map((filmCard: FilmCardProps) => (
        <article key={filmCard.id} className="small-film-card catalog__films-card"
          onMouseOver={() => setActiveFilm(activeFilm)}
        >
          <FilmCard
            id={filmCard.id}
            srcImage={filmCard.srcImage}
            title={filmCard.title}
            previewVideoLink={filmCard.previewVideoLink}
            genre={filmCard.genre}
            posterImage={filmCard.posterImage}
            backgroundColor={filmCard.backgroundColor}
            description={filmCard.description}
            rating={filmCard.rating}
            scoresCount={filmCard.scoresCount}
            director={filmCard.director}
            starring={filmCard.starring}
            runTime={filmCard.runTime}
            released={filmCard.released}
            isFavorite={filmCard.isFavorite}
          />
        </article>
      )
      )}
    </div>
  );
}

export default FilmsList;
