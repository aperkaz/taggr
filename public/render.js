const { remote } = require("electron");
const { observe } = require("@nx-js/observer-util");

const StartPage = require("./components/StartPage");
const DashboardPage = require("./components/DashboardPage");
const createStore = require("./store");

// itialize store
let store = createStore();

// initialize UI components
// const StartPageComponent = new StartPage(store);
// const DashboardPageComponent = new DashboardPage(store);

// // reactive routing
// observe(() => {
//   switch (store.appStatus) {
//     case "START_PAGE":
//       DashboardPageComponent.unmount();
//       StartPageComponent.mount();
//       break;
//     case "DASHBOARD_PAGE":
//       StartPageComponent.unmount();
//       DashboardPageComponent.mount();
//       break;
//     default:
//   }
// });

console.log("render process loaded");
