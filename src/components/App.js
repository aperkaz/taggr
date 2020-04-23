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

  const rootFolderPath = filePaths ? filePaths[0] : null;

  if (!rootFolderPath) return;

  await triggerAction({
    type: ACTIONS.SET_CURRENT_PAGE,
    payload: CONSTANTS.PAGES.DASHBOARD_PAGE,
  });

  await triggerAction({
    type: ACTIONS.SET_ROOT_FOLDER_PATH,
    payload: rootFolderPath,
  });

  await triggerAction({
    type: ACTIONS.CALCULATE_IMAGE_PATHS_IN_ROOT,
    payload: rootFolderPath,
  });
};

// TODONOW: refactor to router
const App = () =>
  html`<div style=${styles}>
    ${uiStore.currentPage === CONSTANTS.PAGES.START_PAGE
      ? html`<${StartPage} onSelectRootFolderPath=${selectRootFolderPath} />`
      : html`<${DashboardPage}
          filteredImageList="${uiStore.filteredImageList}"
          tagCountList="${uiStore.tagCountList}"
          onInputChange="${debounce(
            (payload) =>
              triggerAction({
                type: ACTIONS.SET_IMAGE_FILTER_TAG_SEARCH_VALUE,
                payload,
              }),
            300
          )}"
          onPressReset="${async () =>
            await triggerAction({
              type: ACTIONS.SET_CURRENT_PAGE,
              payload: CONSTANTS.PAGES.START_PAGE,
            })}"
        />`}
  </div>`;

const styles = {
  height: "100%",
};

module.exports = view(App);
