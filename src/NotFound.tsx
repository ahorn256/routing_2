import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h2 data-testid='not-found-caption'>Not Found</h2>
      <p>weiter zur <Link to='/'>Startseite</Link></p>
    </>
  );
}

export default NotFound;
