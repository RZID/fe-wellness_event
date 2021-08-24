import { ArrowReturnLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const NotFound = ({ error }) => {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div>
        <h3>Oops, the route you are going to is not available</h3>
        <p>{error}</p>
        <Link to="/">
          <button className="btn btn-orange">
            {" "}
            <ArrowReturnLeft /> Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
