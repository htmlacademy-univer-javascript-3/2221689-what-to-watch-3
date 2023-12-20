import { useState } from 'react';
import FilmOverview from '../film-overview/film-overview';
import { TabsInfo } from '../../const';
import FilmReview from '../film-review/film-review';
import FilmDetails from '../film-details/film-details';
import classNames from 'classnames';
import { FullFilmCard } from '../../types/full-film-card';

type TabsProps = {
    filmCard: FullFilmCard;
}

function Tabs({ filmCard }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(TabsInfo.Overview);

  const isOverview = activeTab === TabsInfo.Overview;
  const isReviews = activeTab === TabsInfo.Reviews;
  const isDetails = activeTab === TabsInfo.Details;

  function handleLinkClick(tab: string) {
    setActiveTab(tab);
  }

  function getActiveTab(tab: string) {
    switch (tab) {
      case TabsInfo.Overview:
        return <FilmOverview filmCard={filmCard}/>;
      case TabsInfo.Reviews:
        return <FilmReview filmId={filmCard.id}/>;
      case TabsInfo.Details:
        return <FilmDetails filmCard={filmCard}/>;
    }
  }

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className="film-nav__item">
            <a data-testid="tab-overview" className={classNames(['film-nav__link', isOverview && 'film-nav__item--active'])} onClick={() => handleLinkClick(TabsInfo.Overview)}>Overview</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isDetails && 'film-nav__item--active'])} onClick={() => handleLinkClick(TabsInfo.Details)}>Details</a>
          </li>
          <li className="film-nav__item">
            <a className={classNames(['film-nav__link', isReviews && 'film-nav__item--active'])} onClick={() => handleLinkClick(TabsInfo.Reviews)}>Reviews</a>
          </li>
        </ul>
      </nav>
      { getActiveTab(activeTab) }
    </>
  );
}

export default Tabs;
