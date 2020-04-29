import React from "react";
import ReactDOM from "react-dom";
// TODONOW:
// import { initializeWorkers } from "./workers/index";
// const initializeStores = require("./store/index");
import App from "./App";
import "./index.css";

// initialize app dependencies
// initializeWorkers();
// initializeStores();

ReactDOM.render(<App />, document.getElementById("app"));
