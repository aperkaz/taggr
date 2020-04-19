const ReactDOM = require("react-dom");

const renderElementInContainer = (component) => {
  const container = document.createElement("div");
  container.style.height = "100%";

  const inner = document.createElement("div");
  inner.style.height = "100%";

  container.appendChild(inner);

  ReactDOM.render(component, inner);

  return container;
};

module.exports = { renderElementInContainer };
