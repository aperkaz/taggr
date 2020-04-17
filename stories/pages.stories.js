const { html } = require("htm/react");
const ReactDOM = require("react-dom");

const StartPageComponent = require("../src/components/StartPage");

export default {
  title: "Pages",
};

const selectRootFolderPath = () => console.log("select root path");

export const StartPage = () => {
  const container = document.createElement("div");

  ReactDOM.render(
    html`<${StartPageComponent}
      onSelectRootFolderPath=${selectRootFolderPath}
    />`,
    container
  );

  return container;
};
