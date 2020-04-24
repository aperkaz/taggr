const ReactDOM = require("react-dom");
const { html } = require("htm/react");
const { initializeWorkers } = require("./workers/index");
const initializeStores = require("./store/index");
const App = require("./components/App");

// initialize app dependencies
initializeWorkers();
initializeStores();

ReactDOM.render(html`<${App} />`, document.getElementById("root"));
