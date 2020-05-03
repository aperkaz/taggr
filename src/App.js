const { dialog } = require("electron").remote;

import React from "react";
import { hot, setConfig } from "react-hot-loader";
import { view } from "@risingstack/react-easy-state";
import debounce from "lodash.debounce";

import StartPage from "./components/pages/StartPage";
import DashboardPage from "./components/pages/DashboardPage";
import uiStore, { ACTIONS } from "./uiStore";
import { triggerAction } from "./backend";

import CONSTANTS from "./constants";

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const projectRootFolderPath = filePaths ? filePaths[0] : null;

  if (!projectRootFolderPath) return;

  triggerAction({
    name: ACTIONS.SET_UI_ROUTE,
    payload: CONSTANTS.ROUTES.DASHBOARD_PAGE,
  });

  triggerAction({
    name: ACTIONS.CREATE_PROJECT,
    payload: projectRootFolderPath,
  });
};

const App = view(() => (
  <div style={{ height: "100%" }}>{renderRoute(uiStore.activeRoute)}</div>
));

const renderRoute = (route) => {
  switch (route) {
    case CONSTANTS.ROUTES.START_PAGE:
      return (
        <StartPage
          onSelectRootFolderPath={selectRootFolderPath}
          onLogoClick={() =>
            // https://github.com/electron/electron/issues/1344#issuecomment-339585884
            triggerAction({
              name: ACTIONS.SET_UI_ROUTE,
              payload: CONSTANTS.ROUTES.START_PAGE,
            })
          }
        />
      );
    case CONSTANTS.ROUTES.DASHBOARD_PAGE:
      return (
        <DashboardPage
          filteredImageList={uiStore.filteredImageList}
          tagProcessingStatus={uiStore.tagProcessingStatus}
          tagCountList={uiStore.tagCountList}
          onInputChange={debounce(
            (payload) =>
              triggerAction({
                name: ACTIONS.FILTER_RESULTS_BY_TAG,
                payload,
              }),
            300
          )}
          onPressReset={async () => {
            triggerAction({
              name: ACTIONS.SET_UI_ROUTE,
              payload: CONSTANTS.ROUTES.START_PAGE,
            });
          }}
        />
      );
  }
};

setConfig({
  showReactDomPatchNotification: false,
});

export default hot(module)(App);
