import { useRef, useState } from 'react';
import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  filmCards: FilmCardProps[];
}

function FilmsList({ filmCards }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter(filmId: string) {
    timerRef.current = setTimeout(() => setActiveFilm(filmId), 1000);
  }

  function handleMouseLeave() {
    setActiveFilm('');
    clearTimeout(timerRef.current as NodeJS.Timeout);
  }

  return (
    <div className="catalog__films-list">
      {filmCards.map((filmCard) => (
        <article key={filmCard.id} className="small-film-card catalog__films-card" onMouseEnter={() => {
          handleMouseEnter(filmCard.id);
        }}
        onMouseLeave={handleMouseLeave}
        >
          <FilmCard {...filmCard} isActive={activeFilm}/>
        </article>
      )
      )}
    </div>
  );
}

export default FilmsList;
