import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" replace>
        Go to Home
      </Link>
    </div>
  );
};
