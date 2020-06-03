import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import trackEventInProd from "../shared/trackEventInProd";
import store from "./store";
import App from "./components/App";
import {
  setupFpsOverlayInDev,
  setupCrashAnalyticsInProd,
} from "./components/utils";
import "./statics/index.css";

setupFpsOverlayInDev();
setupCrashAnalyticsInProd();

trackEventInProd({ category: "User Interaction", action: "App opened" });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
