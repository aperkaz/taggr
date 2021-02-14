import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { setupFpsOverlayInDev } from "./components/utils";

import store from "./store";
import { initSocketToServer } from "./services/helpers";
import "./statics/index.css";

// SETUP ANALYTICS
import "./analystics";
import { isBuildTestEnv, isBuildProductionEnv } from "./environment";

if (isBuildTestEnv() || isBuildProductionEnv()) setupFpsOverlayInDev();
initSocketToServer();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
