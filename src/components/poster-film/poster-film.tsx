type PosterFilmProps = {
    srcImage: string;
    title: string;
}

function PosterFilm({ srcImage, title }: PosterFilmProps): JSX.Element {
  return (
    <img data-testid='poster' src={srcImage} alt={title} width="280" height="175" />
  );
}

export default PosterFilm;
