import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";

import { BrowserRouter as Router } from "react-router-dom"

import { injectGlobal } from "emotion";

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';


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
  <Router basename="/">
    <App />
  </Router>
  ,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
