import MainPage from '../../pages/main-page/main-page';

type AppScreenProps = {
    titleFilm: string;
    genreFilm: string;
    yearFilm: string;
}

function App({titleFilm, genreFilm, yearFilm}: AppScreenProps) : JSX.Element {
  return (
    <MainPage titleFilm={titleFilm} genreFilm={genreFilm} yearFilm={yearFilm}/>
  );
}

export default App;
