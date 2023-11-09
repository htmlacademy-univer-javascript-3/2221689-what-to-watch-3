import { useRef, useState } from 'react';
import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';

type FilmsListProps = {
  filmCards: FilmCardProps[];
  filmCount?: number;
}

function FilmsList({ filmCards, filmCount }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  if (filmCount && filmCount > filmCards.length) {
    filmCount = filmCards.length;
  }
  const films = filmCount ? filmCards.slice(0, filmCount) : filmCards;

  function handleMouseEnter(filmId: string) {
    timerRef.current = setTimeout(() => setActiveFilm(filmId), 1000);
  }

  function handleMouseLeave() {
    setActiveFilm('');
    clearTimeout(timerRef.current as NodeJS.Timeout);
  }

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <article key={film.id} className="small-film-card catalog__films-card" onMouseEnter={() => {
          handleMouseEnter(film.id);
        }}
        onMouseLeave={handleMouseLeave}
        >
          <FilmCard {...film} isActive={activeFilm}/>
        </article>
      )
      )}
    </div>
  );
}

export default FilmsList;
