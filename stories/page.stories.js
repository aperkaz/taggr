const { html } = require("htm/react");
const { renderElementInContainer } = require("./utils");

const StartPageComponent = require("../src/components/pages/StartPage");
const DashboardPageComponent = require("../src/components/pages/DashboardPage");

const imageList = require("./mocks/imageList");

export default {
  title: "Pages",
};

export const StartPage = () =>
  renderElementInContainer(
    html`<${StartPageComponent}
      onSelectRootFolderPath=${() => console.log("select root path")}
    />`
  );

export const DashboardPage = () =>
  renderElementInContainer(
    html`<${DashboardPageComponent}
      filteredImageList=${imageList}
      onInputChange=${(value) => console.log("input: ", value)}
    />`
  );
