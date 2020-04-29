import React from "react";
import ReactDOM from "react-dom";
import initializeStores from "./store/index";
import App from "./App";
import "./index.css";

initializeStores();

ReactDOM.render(<App />, document.getElementById("app"));
