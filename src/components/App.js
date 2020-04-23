const { dialog } = require("electron").remote;
const { html } = require("htm/react");
const { view } = require("@risingstack/react-easy-state");
const debounce = require("lodash.debounce");

const StartPage = require("./pages/StartPage");
const DashboardPage = require("./pages/DashboardPage");

const { triggerAction, ACTIONS } = require("../store/actions");
const uiStore = require("../store/modules/uiStore");

const CONSTANTS = require("../constants");

const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const projectRootFolderPath = filePaths ? filePaths[0] : null;

  if (!projectRootFolderPath) return;

  await triggerAction({
    type: ACTIONS.SET_UI_PAGE,
    payload: CONSTANTS.PAGES.DASHBOARD_PAGE,
  });

  await triggerAction({
    type: ACTIONS.CREATE_PROJECT,
    payload: projectRootFolderPath,
  });
};

const renderRoute = (route) => {
  switch (route) {
    case CONSTANTS.PAGES.START_PAGE:
      return html`<${StartPage}
        onSelectRootFolderPath=${selectRootFolderPath}
      />`;
    case CONSTANTS.PAGES.DASHBOARD_PAGE:
      return html`<${DashboardPage}
        filteredImageList="${uiStore.filteredImageList}"
        tagCountList="${uiStore.tagCountList}"
        onInputChange="${debounce(
          (payload) =>
            triggerAction({
              type: ACTIONS.FILTER_RESULTS_BY_TAG,
              payload,
            }),
          300
        )}"
        onPressReset="${async () =>
          await triggerAction({
            type: ACTIONS.SET_UI_PAGE,
            payload: CONSTANTS.PAGES.START_PAGE,
          })}"
      />`;
      break;
  }
};

const App = () =>
  html`<div style=${styles.wrapper}>
    ${renderRoute(uiStore.currentPage)}
  </div>`;

const styles = {
  wrapper: {
    height: "100%",
  },
};

module.exports = view(App);
