const ReactDOM = require("react-dom");

let container;

const renderElementInContainer = (component) => {
  if (!container) {
    container = document.createElement("div");
    container.style.height = "100%";
  } else {
    // manually trigger unmount, to clean up listeners in component. Error shows, but it unmounts properly
    ReactDOM.unmountComponentAtNode(container);
  }

  ReactDOM.render(component, container);

  return container;
};

module.exports = { renderElementInContainer };
