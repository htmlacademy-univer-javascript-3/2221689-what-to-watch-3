type FilmCardProps = {
    srcImage: string;
    titleFilm: string;
}

function FilmCard({srcImage, titleFilm}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={srcImage} alt={titleFilm} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{titleFilm}</a>
      </h3>
    </article>
  );
}

export default FilmCard;
