import React from "react";
import ReactDOM from "react-dom";
import App from "./routers/index";
import reportWebVitals from "./reportWebVitals";
// Bootstrap purposes
import "bootstrap/dist/css/bootstrap.min.css";
// Own styles purposes
import "./assets/css/styles.css";

import store from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
