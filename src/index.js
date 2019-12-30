import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router } from "react-router-dom"

import { injectGlobal } from "emotion";

injectGlobal({
  html: {
    height: "100%",
    width: "100%"
  },
  body: {
    height: "100%",
    width: "100%",
    background: "#E3E8EE"
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>
  ,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
