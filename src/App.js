const { dialog } = require("electron").remote;

import { hot } from "react-hot-loader";
import React from "react";
import { view } from "@risingstack/react-easy-state";

import debounce from "lodash.debounce";

import StartPage from "./components/StartPage.js";
// import DashboardPage from "./components/DashboardPage";
// TODONOW: add store
// import { UIStore, actions } from "./store";
import { APP_STATUS } from "./constants";

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const projectRootFolderPath = filePaths ? filePaths[0] : null;

  if (!projectRootFolderPath) return;

  // TODONOW: trigger actions
  console.log("select path");
  // await triggerAction({
  //   type: ACTIONS.SET_UI_PAGE,
  //   payload: CONSTANTS.PAGES.DASHBOARD_PAGE,
  // });

  // await triggerAction({
  //   type: ACTIONS.CREATE_PROJECT,
  //   payload: projectRootFolderPath,
  // });
};

const App = view(() => (
  <div style={{ height: "100%" }}>
    {/* {UIStore.appStatus === APP_STATUS.START_PAGE ? ( */}
    <StartPage onSelectRootFolderPath={selectRootFolderPath} />
    {/* ) : ( */}
    {/* <DashboardPage imageList={UIStore.filteredImageList} /> */}
    {/* )} */}
  </div>
));

// const renderRoute = (route) => {
//   switch (route) {
//     case CONSTANTS.PAGES.START_PAGE:
//       return <StartPage onSelectRootFolderPath={selectRootFolderPath} />;
//     case CONSTANTS.PAGES.DASHBOARD_PAGE:
//       return (
//         <DashboardPage
//           // filteredImageList={uiStore.filteredImageList}
//           // tagProcessingStatus={uiStore.tagProcessingStatus}
//           // tagCountList={uiStore.tagCountList}
//           onInputChange={debounce(
//             (payload) => console.log("press button: TODONOW"),
//             // triggerAction({
//             //   type: ACTIONS.FILTER_RESULTS_BY_TAG,
//             //   payload,
//             // }),
//             300
//           )}
//           onPressReset="${async () =>
//           await triggerAction({
//             type: ACTIONS.SET_UI_PAGE,
//             payload: CONSTANTS.PAGES.START_PAGE,
//           })}"
//         />
//       );
//       break;
//   }
// };

export default hot(module)(App);
