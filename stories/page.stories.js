const { html } = require("htm/react");
const ReactDOM = require("react-dom");

const StartPageComponent = require("../src/components/StartPage");

export default {
  title: "Pages",
};

export const StartPage = () => {
  const container = document.createElement("div");

  ReactDOM.render(
    html`<${StartPageComponent}
      onSelectRootFolderPath=${() => console.log("select root path")}
    />`,
    container
  );

  return container;
};
