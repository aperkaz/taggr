const { remote } = require("electron");

const IntroPage = require("./components/IntroPage");
const MainPage = require("./components/MainPage");
const store = require("./store");
const { initializeImageTaggingWorker } = require("./workers/index");

// initialize workers
const imageTaggingWorker = initializeImageTaggingWorker();

// initialize class components
const IntroPageComponent = new IntroPage(imageTaggingWorker);
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
