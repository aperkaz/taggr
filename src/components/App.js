const { dialog } = require("electron").remote;
const { html } = require("htm/react");
const { view } = require("@risingstack/react-easy-state");

// TODO: improvement: refactor store imports for cleaningess
const { triggerAction, ACTIONS, uiStore } = require("../store/actions");
const CONSTANTS = require("../store/constants");

const StartPage = require("./pages/StartPage");
const { withStore: DashboardPage } = require("./pages/DashboardPage");

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const rootFolderPath = filePaths ? filePaths[0] : null;

  if (rootFolderPath) {
    triggerAction({
      type: ACTIONS.SET_ROOT_FOLDER_PATH,
      payload: rootFolderPath,
    });

    triggerAction({
      type: ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT,
      payload: rootFolderPath,
    });

    triggerAction({
      type: ACTIONS.SET_CURRENT_PAGE,
      payload: CONSTANTS.PAGES.DASHBOARD_PAGE,
    });
  }
};

const App = () =>
  html`<div style=${styles}>
    ${uiStore.currentPage === CONSTANTS.PAGES.START_PAGE
      ? html`<${StartPage} onSelectRootFolderPath=${selectRootFolderPath} />`
      : html`<${DashboardPage} />`}
  </div>`;

const styles = {
  height: "100%",
};

module.exports = view(App);
