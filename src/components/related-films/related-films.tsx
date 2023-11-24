import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FullFilmCard } from '../../types/full-film-card.props';
import FilmCard from '../film-card/film-card';
import { fetchReleatedFilms } from '../../store/api-actions';
import { RequestStatus } from '../../const';
import { Loader } from '../loader/loader';
import { ErrorLoad } from '../error-load/error-load';
import { getRelatedFilms, getRelatedFilmsFetchingStatus } from '../../store/film-data/selectors';
import { FilmCardProps } from '../../types/film-card.props';

type RelatedFilmsProps = {
    filmCard: FullFilmCard;
}

function RelatedFilms({ filmCard }: RelatedFilmsProps): JSX.Element {
  const fetchingStatus = useAppSelector(getRelatedFilmsFetchingStatus);
  const relatedFilms = useAppSelector(getRelatedFilms);
  const dispatch = useAppDispatch();

  const [activeFilm, setActiveFilm] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter(filmId: string) {
    timerRef.current = setTimeout(() => setActiveFilm(filmId), 1000);
  }

  function handleMouseLeave() {
    setActiveFilm('');
    clearTimeout(timerRef.current as NodeJS.Timeout);
  }

  useEffect(() => {
    dispatch(fetchReleatedFilms({ filmId: filmCard.id }));
  }, [filmCard.id, dispatch]);
  return (
    <>
      {fetchingStatus === RequestStatus.Pending && <Loader />}
      {fetchingStatus === RequestStatus.Error && <ErrorLoad/>}
      {fetchingStatus === RequestStatus.Success &&
    <div className="catalog__films-list">
      {relatedFilms.map((film: FilmCardProps) => (
        <FilmCard {...film} isActive={activeFilm} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} key={film.id}/>
      )
      )}
    </div>}
    </>
  );
}

export default RelatedFilms;
