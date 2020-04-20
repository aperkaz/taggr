const ReactDOM = require("react-dom");
const { html } = require("htm/react");
const App = require("./components/App");

ReactDOM.render(html`<${App} />`, document.getElementById("root"));
