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
      tagCountList="${[
        { name: "dogs", count: 220 },
        { name: "cats", count: 119 },
        { name: "party", count: 50 },
        { name: "suit", count: 21 },
        { name: "beer", count: 13 },
        { name: "pizza", count: 9 },
        { name: "forest", count: 5 },
        { name: "sea", count: 2 },
        { name: "dolphin", count: 1 },
      ]}"
    />`
  );
