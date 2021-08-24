import { Navbar, Container } from "react-bootstrap";
import { FilterRight, X } from "react-bootstrap-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GET_LOGOUT } from "../store/actions/auth";
import { CSSTransition } from "react-transition-group";

const NavbarComponent = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(GET_LOGOUT());
    return history.push("/login");
  };
  const [isToggled, toggleNavbar] = useState(false);
  return (
    <div className="sticky-top">
      <CSSTransition in={isToggled} timeout={500} classNames="navbar-head">
        <Navbar className="py-0" variant="orange" bg="white">
          <Container className="align-items-center">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={
                  isToggled
                    ? "/assets/images/embreo-logo-white.png"
                    : "/assets/images/embreo-logo.png"
                }
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{" "}
            </Navbar.Brand>
            <div
              className={`d-flex align-items-center ${
                isToggled ? "text-white" : "text-orange"
              }`}
            >
              {props.isLoggedin ? `Hello, ${props.name}` : ""}
              <button
                className={`d-flex align-items-center ${
                  isToggled ? "btn text-white" : "btn text-orange"
                }`}
                onClick={() => toggleNavbar(!isToggled)}
              >
                <h1 className="">{isToggled ? <X /> : <FilterRight />}</h1>
              </button>
            </div>
          </Container>
        </Navbar>
      </CSSTransition>
      <CSSTransition
        in={isToggled}
        timeout={500}
        classNames="navbar-fade"
        unmountOnExit
      >
        <div>
          {/* If navbar toggled */}
          <div className="position-absolute w-100 bg-orange text-white">
            <div className="container d-flex justify-content-end">
              {props.isLoggedin ? (
                <h5 className="cursor-pointer" onClick={() => logout()}>
                  Logout
                </h5>
              ) : (
                <div>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default NavbarComponent;
