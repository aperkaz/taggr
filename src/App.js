const { dialog } = require("electron").remote;

import { hot } from "react-hot-loader";
import React from "react";
import { view } from "@risingstack/react-easy-state";

import StartPage from "./components/StartPage.js";
import MainPage from "./components/MainPage.js";
import state, { initializeWorkersWithStore, actions } from "./store";
import { APP_STATUS } from "./constants";
import "./index.css";

initializeWorkersWithStore();

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const rootFolderPath = filePaths ? filePaths[0] : null;

  if (rootFolderPath) {
    actions.setRootFolderPath(rootFolderPath);
    actions.setAppStatus(APP_STATUS.DASHBOARD_PAGE);
  }
};

const App = view(() => (
  <div style={{ height: "100%" }}>
    {state.appStatus === APP_STATUS.START_PAGE ? (
      <StartPage onSelectRootFolderPath={selectRootFolderPath} />
    ) : (
      <MainPage />
    )}
  </div>
));

export default hot(module)(App);
