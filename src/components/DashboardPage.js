const { html } = require("htm/react");
const { view } = require("@risingstack/react-easy-state");

const DashboardPage = () => html`<div>Dashboard page</div>`;

module.exports = view(DashboardPage);
