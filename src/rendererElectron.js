import React from "react";
import ReactDOM from "react-dom";
import initializeStores from "./store/index";
import App from "./App";
import "./index.css";

initializeStores();

const { getGlobal } = require("electron").remote;
const trackEvent = getGlobal("trackEvent");

// trigger app started event
trackEvent("User Interaction", "App opened");

ReactDOM.render(<App />, document.getElementById("app"));
