type PosterFilmProps = {
    srcImage: string;
    title: string;
}

function PosterFilm({ srcImage, title }: PosterFilmProps): JSX.Element {
  return (
    <div className="small-film-card__image">
      <img src={srcImage} alt={title} width="280" height="175" />
    </div>
  );
}

export default PosterFilm;
