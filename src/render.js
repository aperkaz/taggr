const { remote } = require("electron");

const IntroPage = require("./components/IntroPage");
const MainPage = require("./components/MainPage");
const store = require("./store");
const { initializeWorkers } = require("./workers/index");

// initialize workers
const workers = initializeWorkers(store);

// itialize store
store.workers = workers;

// initialize class components
const IntroPageComponent = new IntroPage(store, workers);
const MainPageComponent = new MainPage();

// TODO: clean up state when previous appStas changes, make reactive with store -> obseve
switch (store.appStatus) {
  case "OPEN":
    IntroPageComponent.render();
    break;
  case "READY":
    MainPageComponent.render();
    break;
  default:
}
