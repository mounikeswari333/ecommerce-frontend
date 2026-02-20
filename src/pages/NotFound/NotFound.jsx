import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition/PageTransition";
import "./NotFound.css";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="not-found-page">
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link className="button" to="/">
          Back home
        </Link>
      </div>
    </PageTransition>
  );
};

export default NotFound;
