import Navbar from "../components/Navbar";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="vh-100">
      <Navbar />
      <div className="container d-flex align-items-center h-landing-content text-secondary text-dinpro">
        <div>
          <h1>Welcome!</h1>
          <p>
            To an online booking of wellness events (health talks, onsite
            screenings, etc) and the vendor approval or rejection app
          </p>
          <Link to="/login">
            <Button variant="orange" size="lg" className="rounded-pill">
              Login to continue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
