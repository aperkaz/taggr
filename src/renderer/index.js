import { ipcRenderer } from "electron";
import logger from "electron-timber";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./index.css";
import {
  setupFpsOverlayInDev,
  setupCrashAnalyticsInProd,
  setupLinkRoutingToExternalBrowser,
  trackEventInProd,
} from "./utils";

setupFpsOverlayInDev();
setupCrashAnalyticsInProd();
setupLinkRoutingToExternalBrowser();

trackEventInProd("User Interaction", "App opened");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);

logger.log("Renderer process started");
