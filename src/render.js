const { remote } = require("electron");
const { observe } = require("@nx-js/observer-util");

const IntroPage = require("./components/IntroPage");
const MainPage = require("./components/MainPage");
const store = require("./store");
const { initializeWorkers } = require("./workers/index");

// initialize web workers
const workers = initializeWorkers(store);

// itialize store
store.workers = workers;

// initialize class components
const IntroPageComponent = new IntroPage(store, workers);
const MainPageComponent = new MainPage();

// reactive routing
observe(() => {
  switch (store.appStatus) {
    case "OPEN":
      IntroPageComponent.render();
      break;
    case "INITIALIZED":
      MainPageComponent.render();
      break;
    default:
  }
});
