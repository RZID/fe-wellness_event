import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import routerGuard from "../middlewares/authGuard";
import Home from "../views/Home";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import loading from "../components/systems/Loading";
import notFound from "../components/systems/NotFound";
const App = () => {
  return (
    <Router>
      <GuardProvider guards={[routerGuard]} loading={loading} error={notFound}>
        <Switch>
          <GuardedRoute path="/" exact component={Home} />
          <GuardedRoute
            path="/login"
            meta={{ auth: "unlog" }}
            component={Login}
          />
          <GuardedRoute
            path="/dashboard"
            meta={{ auth: "log" }}
            component={Dashboard}
          />
          <GuardedRoute path="*" meta={{ auth: "log" }} component={notFound} />
        </Switch>
      </GuardProvider>
    </Router>
  );
};
export default App;
