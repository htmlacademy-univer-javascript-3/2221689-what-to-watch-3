import { Link, useParams } from 'react-router-dom';
import { AddReviewPageProps } from '../../types/add-review-page.props';
import { FilmCardProps } from '../../types/film-card.props';
import ReviewForm from '../../components/review-form/review-form';

function AddReviewPage({ filmCards }: AddReviewPageProps): JSX.Element {
  const {id} = useParams();
  const filmCard = filmCards.find((filmCardItem) => filmCardItem.id === id) as FilmCardProps;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={filmCard.posterImage} alt={filmCard.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={'/'} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id as string}`} className="breadcrumbs__link">{filmCard.title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={'/login'} className="user-block__link">Sign out</Link>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={filmCard.posterImage} alt={`${filmCard.title} poster`} width="218" height="327" />
        </div>
      </div>

      <ReviewForm/>
    </section>
  );
}

export default AddReviewPage;
