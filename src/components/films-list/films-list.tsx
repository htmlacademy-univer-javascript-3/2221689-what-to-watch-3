import { useRef, useState } from 'react';
import { FilmCardType } from '../../types/film-card.type';
import FilmCard from '../film-card/film-card';
import React from 'react';
import getCurrentFilms from '../../utils/get-current-films';

type FilmsListProps = {
  filmCards: FilmCardType[];
  filmCount?: number;
}

function FilmsList({ filmCards, filmCount }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const films = getCurrentFilms(filmCards, filmCount);

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
      ))}
    </div>
  );
}

export default FilmsList;
