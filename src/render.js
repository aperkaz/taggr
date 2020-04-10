const { remote } = require("electron");
const { observe } = require("@nx-js/observer-util");

const StartPage = require("./components/StartPage");
const DashboardPage = require("./components/DashboardPage");
const store = require("./store");
const { initializeWorkers } = require("./workers/index");

// initialize web workers
const workers = initializeWorkers(store);

// itialize store
store.workers = workers;

// initialize class components
const StartPageComponent = new StartPage(store, workers);
const DashboardPageComponent = new DashboardPage();

// reactive routing
observe(() => {
  switch (store.appStatus) {
    case "START_PAGE":
      DashboardPageComponent.unmount();
      StartPageComponent.mount();
      StartPageComponent.render();
      break;
    case "DASHBOARD_PAGE":
      StartPageComponent.unmount();
      DashboardPageComponent.mount();
      DashboardPageComponent.render();
      break;
    default:
  }
});
