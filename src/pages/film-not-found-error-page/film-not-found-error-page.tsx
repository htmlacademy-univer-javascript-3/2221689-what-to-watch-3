import { Helmet } from 'react-helmet-async';


function FilmNotFoundErrorPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Film was not found</title>
      </Helmet>
      <div style={{ textAlign: 'center' }}>
        <h1>Film was not found</h1>
      </div>
    </>
  );
}

export default FilmNotFoundErrorPage;
