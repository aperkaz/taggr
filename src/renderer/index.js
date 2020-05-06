import { ipcRenderer } from "electron";
import logger from "electron-timber";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
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

ReactDOM.render(<App />, document.getElementById("app"));

logger.log("Renderer process started");
