import { useState } from 'react';
import { FilmCardProps } from '../../types/film-card.props';
import { ReviewProps } from '../../types/review.props';
import FilmOverview from '../film-overview/film-overview';
import { TabsInfo } from '../../const';
import FilmReview from '../film-review/film-review';
import FilmDetails from '../film-details/film-details';
import classNames from 'classnames';

type TabsProps = {
    filmCard: FilmCardProps;
    reviews: ReviewProps[];
}

function Tabs({ filmCard, reviews }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(TabsInfo.Overview);

  const isOverview = activeTab === TabsInfo.Overview;
  const isReviews = activeTab === TabsInfo.Reviews;
  const isDetails = activeTab === TabsInfo.Details;

  function handleClick(tab: string) {
    setActiveTab(tab);
  }

  function getActiveTab(tab: string) {
    switch (tab) {
      case TabsInfo.Overview:
        return <FilmOverview filmCard={filmCard}/>;
      case TabsInfo.Reviews:
        return <FilmReview reviews={reviews}/>;
      case TabsInfo.Details:
        return <FilmDetails filmCard={filmCard}/>;
    }
  }

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isOverview && 'film-nav__item--active'])} onClick={() => handleClick(TabsInfo.Overview)}>Overview</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isDetails && 'film-nav__item--active'])} onClick={() => handleClick(TabsInfo.Details)}>Details</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isReviews && 'film-nav__item--active'])} onClick={() => handleClick(TabsInfo.Reviews)}>Reviews</a>
          </li>
        </ul>
      </nav>
      { getActiveTab(activeTab) }
    </>
  );
}

export default Tabs;
