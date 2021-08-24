import Navbar from "../components/Navbar";
import { Card, Row, Col, Button, Toast, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_LOGIN, CLOSE_TOAST } from "../store/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const closeToast = () => dispatch(CLOSE_TOAST());
  const getAuthData = useSelector((state) => state.auth);
  const formChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };
  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(GET_LOGIN(formData));
  };
  useEffect(() => {
    if (getAuthData.token) return history.push("/dashboard");
  });
  return (
    <div className="vh-100">
      <Navbar />
      <div className="container d-flex align-items-center h-landing-content text-secondary text-dinpro">
        <Card className="border-0 border-md w-100">
          <Row>
            <Col
              md="5"
              className="illustration border-end"
              style={{
                backgroundImage: "url('/assets/illustration/Mobile-login.svg')"
              }}
            ></Col>
            <Col className="py-4 mx-3">
              <div>
                <h1>Login</h1>
                <p>Please login to continue</p>
              </div>
              <form action="" className="mt-3" onSubmit={(e) => submitLogin(e)}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatUsername"
                    autoComplete="username"
                    placeholder="name@example.com"
                    name="username"
                    value={formData.username}
                    onChange={formChange}
                  />
                  <label htmlFor="floatUsername">Username</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatPassword"
                    autoComplete="current-password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={formChange}
                  />
                  <label htmlFor="floatPassword">Password</label>
                </div>
                <div className="text-end">
                  <Button
                    variant="orange"
                    className="rounded-pill mt-3"
                    type="submit"
                    disabled={getAuthData.isLoading ? true : false}
                  >
                    {getAuthData.isLoading ? (
                      <div>
                        <Spinner animation="border" role="status" size="sm">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>{" "}
                        Please wait
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Card>
      </div>
      <div className="d-flex justify-content-end me-3">
        <Toast
          show={getAuthData.toast}
          onClose={closeToast}
          delay={5000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {getAuthData.isError ? "Oops!" : "Success!"}
            </strong>
          </Toast.Header>
          <Toast.Body>{getAuthData.message}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default Login;
