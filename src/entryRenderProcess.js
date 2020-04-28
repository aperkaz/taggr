const { getGlobal } = require("electron").remote;
const trackEvent = getGlobal("trackEvent");
const ReactDOM = require("react-dom");
const { html } = require("htm/react");
const { initializeWorkers } = require("./workers/index");
const initializeStores = require("./store/index");
const App = require("./components/App");

// initialize app dependencies
initializeWorkers();
initializeStores();

// trigger app started event
trackEvent("User Interaction", "App opened");

ReactDOM.render(html`<${App} />`, document.getElementById("root"));
