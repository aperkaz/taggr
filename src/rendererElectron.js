import React from "react";
import ReactDOM from "react-dom";
import isDev from "electron-is-dev";
import * as Sentry from "@sentry/browser";
import initializeStores from "./store/index";
import App from "./App";
import "./index.css";

// TODO: feature: timeline with pictures https://github.com/rmariuzzo/react-chronos
// TODO: feature: timeline display of images per day http://tany.kim/quantify-your-year/#/

// Setup tracking
const { getGlobal } = require("electron").remote;
const trackEvent = getGlobal("trackEvent");
trackEvent("User Interaction", "App opened");

// Setup crash analytics
if (!isDev)
  Sentry.init({
    dsn:
      "https://c413216c810946559e9d5c1feb34c92f@o385452.ingest.sentry.io/5218191",
  });

initializeStores();

ReactDOM.render(<App />, document.getElementById("app"));
