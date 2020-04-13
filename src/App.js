import { hot } from "react-hot-loader";
import React from "react";
import { view } from "@risingstack/react-easy-state";

import StartPage from "./components/StartPage.js";
import MainPage from "./components/MainPage.js";
import state, { initializeWorkersWithStore } from "./store";
import { APP_STATUS } from "./constants";
import "./index.css";

initializeWorkersWithStore();

const App = view(() => (
  <div style={{ height: "100%" }}>
    {state.appStatus === APP_STATUS.START_PAGE ? <StartPage /> : <MainPage />}
  </div>
));

export default hot(module)(App);
