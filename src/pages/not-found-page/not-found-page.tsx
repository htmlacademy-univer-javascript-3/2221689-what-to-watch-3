import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Page was not found</title>
      </Helmet>
      <div style={{ textAlign: 'center' }}>
        <h1>404. Page was not found</h1>
        <Link to="/">Go back to the main page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
