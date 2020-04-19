const { dialog } = require("electron").remote;

const { html } = require("htm/react");
const { view } = require("@risingstack/react-easy-state");

const StartPage = require("./pages/StartPage");
const { withStore: DashboardPage } = require("./pages/DashboardPage");
const CONSTANTS = require("../constants");
const { uiStore, actions } = require("../store/uiStore");

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const rootFolderPath = filePaths ? filePaths[0] : null;

  if (rootFolderPath) {
    actions.setRootFolderPath(rootFolderPath);
    actions.setAppStatus(CONSTANTS.APP_STATUS.DASHBOARD_PAGE);
    actions.triggerRecursiveImageFinding(rootFolderPath);
  }
};

const App = () =>
  html`<div style=${styles}>
    ${uiStore.appStatus === CONSTANTS.APP_STATUS.START_PAGE
      ? html`<${StartPage} onSelectRootFolderPath=${selectRootFolderPath} />`
      : html`<${DashboardPage} />`}
  </div>`;

const styles = {
  height: "100%",
};

module.exports = view(App);
