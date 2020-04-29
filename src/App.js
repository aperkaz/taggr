const { dialog } = require("electron").remote;

import React from "react";
import { hot } from "react-hot-loader";
import { view } from "@risingstack/react-easy-state";
import debounce from "lodash.debounce";

import StartPage from "./components/pages/StartPage";
import DashboardPage from "./components/pages/DashboardPage";
import uiStore from "./store/modules/uiStore";
const { triggerAction, ACTIONS } = require("./store");

import CONSTANTS from "./constants";

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const projectRootFolderPath = filePaths ? filePaths[0] : null;

  if (!projectRootFolderPath) return;

  await triggerAction({
    type: ACTIONS.SET_UI_PAGE,
    payload: CONSTANTS.ROUTES.DASHBOARD_PAGE,
  });

  await triggerAction({
    type: ACTIONS.CREATE_PROJECT,
    payload: projectRootFolderPath,
  });
};

const App = view(() => (
  <div style={{ height: "100%" }}>{renderRoute(uiStore.currentPage)}</div>
));

const renderRoute = (route) => {
  switch (route) {
    case CONSTANTS.ROUTES.START_PAGE:
      return <StartPage onSelectRootFolderPath={selectRootFolderPath} />;
    case CONSTANTS.ROUTES.DASHBOARD_PAGE:
      return (
        <DashboardPage
          filteredImageList={uiStore.filteredImageList}
          tagProcessingStatus={uiStore.tagProcessingStatus}
          tagCountList={uiStore.tagCountList}
          onInputChange={debounce(
            (payload) =>
              triggerAction({
                type: ACTIONS.FILTER_RESULTS_BY_TAG,
                payload,
              }),
            300
          )}
          onPressReset={async () =>
            await triggerAction({
              type: ACTIONS.SET_UI_PAGE,
              payload: CONSTANTS.ROUTES.START_PAGE,
            })
          }
        />
      );
  }
};

export default hot(module)(App);
