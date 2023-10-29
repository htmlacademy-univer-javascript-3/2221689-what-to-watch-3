import { useEffect, useState } from 'react';
import { FilmCardProps } from '../../types/film-card.props';
import { ReviewProps } from '../../types/review.props';
import FilmOverview from '../film-overview/film-overview';
import { FilmInfoLink } from '../../const';
import FilmReview from '../film-review/film-review';
import FilmDetails from '../film-details/film-details';
import classNames from 'classnames';

type TabsProps = {
    filmCard: FilmCardProps;
    reviews: ReviewProps[];
}

function Tabs({ filmCard, reviews }: TabsProps): JSX.Element {
  const [filmInfo, setFilmInfo] = useState(<FilmOverview filmCard={filmCard}/>);
  const [filmInfoLink, setFilmInfoLink] = useState(FilmInfoLink.Overview);

  useEffect(() => {
    setFilmInfo(<FilmOverview filmCard={filmCard}/>);
    setFilmInfoLink(FilmInfoLink.Overview);
  }, [filmCard]);

  const isOverview = filmInfoLink === FilmInfoLink.Overview;
  const isReviews = filmInfoLink === FilmInfoLink.Reviews;
  const isDetails = filmInfoLink === FilmInfoLink.Details;

  const handlerOverviewClick = () => {
    setFilmInfo(<FilmOverview filmCard={filmCard}/>);
    setFilmInfoLink(FilmInfoLink.Overview);
  };

  const handlerReviewsClick = () => {
    setFilmInfo(<FilmReview reviews={reviews}/>);
    setFilmInfoLink(FilmInfoLink.Reviews);
  };

  const handlerDetailsClick = () => {
    setFilmInfo(<FilmDetails filmCard={filmCard}/>);
    setFilmInfoLink(FilmInfoLink.Details);
  };

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isOverview && 'film-nav__item--active'])} onClick={handlerOverviewClick}>Overview</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isDetails && 'film-nav__item--active'])} onClick={handlerDetailsClick}>Details</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isReviews && 'film-nav__item--active'])} onClick={handlerReviewsClick}>Reviews</a>
          </li>
        </ul>
      </nav>
      { filmInfo }
    </>
  );
}

export default Tabs;
