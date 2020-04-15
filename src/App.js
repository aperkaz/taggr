const { dialog } = require("electron").remote;

import { hot } from "react-hot-loader";
import React from "react";
import { view } from "@risingstack/react-easy-state";

import StartPage from "./components/StartPage.js";
import DashboardPage from "./components/DashboardPage";
import { UIStore, actions } from "./store";
import { APP_STATUS } from "./constants";

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
    {UIStore.appStatus === APP_STATUS.START_PAGE ? (
      <StartPage onSelectRootFolderPath={selectRootFolderPath} />
    ) : (
      <DashboardPage imageList={UIStore.filteredImageList} />
    )}
  </div>
));

export default hot(module)(App);
