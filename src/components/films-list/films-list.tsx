import { useRef, useState } from 'react';
import { FilmCardProps } from '../../types/film-card.props';
import FilmCard from '../film-card/film-card';
import React from 'react';

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

  const handleMouseEnter = React.useCallback((filmId: string) => {
    timerRef.current = setTimeout(() => setActiveFilm(filmId), 1000);
  },[]);

  const handleMouseLeave = React.useCallback(() => {
    setActiveFilm('');
    clearTimeout(timerRef.current as NodeJS.Timeout);
  },[]);

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <FilmCard {...film} isActive={activeFilm} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={film.id}/>
      )
      )}
    </div>
  );
}

export default FilmsList;
