import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { setupFpsOverlayInDev } from "./components/utils";

import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { initSocketToServer } from "./services";
import "./statics/index.css";

if (window.IS_DEV) setupFpsOverlayInDev();
if (window.IS_DEV != null) initSocketToServer();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
