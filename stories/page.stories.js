const { html } = require("htm/react");
const ReactDOM = require("react-dom");

const StartPageComponent = require("../src/components/pages/StartPage");
const DashboardPageComponent = require("../src/components/pages/DashboardPage");

const imageList = require("./mocks/imageList");

export default {
  title: "Pages",
};

export const StartPage = () => {
  const container = document.createElement("div");
  container.style.height = "100%";

  ReactDOM.render(
    html`<${StartPageComponent}
      onSelectRootFolderPath=${() => console.log("select root path")}
    />`,
    container
  );

  return container;
};

export const DashboardPage = () => {
  const container = document.createElement("div");
  container.style.height = "100%";

  ReactDOM.render(
    html`<${DashboardPageComponent}
      filteredImageList=${imageList}
      onInputChange=${(value) => console.log("input: ", value)}
    />`,
    container
  );

  return container;
};
