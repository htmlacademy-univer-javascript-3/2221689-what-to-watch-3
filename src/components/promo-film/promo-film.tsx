import { useNavigate } from 'react-router-dom';
import FavoriteStatusButton from '../favorite-status-button/favorite-status-button';
import { PromoFilmProps } from '../../types/promo-film.props';

type PromoFilmCompProps = {
  promoFilm: PromoFilmProps;
}

function PromoFilm({promoFilm}: PromoFilmCompProps): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{promoFilm.name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{promoFilm.genre}</span>
            <span className="film-card__year">{promoFilm.released}</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button" onClick={() => navigate(`/player/${promoFilm.id}`)}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <FavoriteStatusButton filmId={promoFilm.id} isFavorite={promoFilm.isFavorite}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoFilm;
