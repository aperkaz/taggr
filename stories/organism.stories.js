const { html } = require("htm/react");
const ReactDOM = require("react-dom");

const HeaderComponent = require("../src/components/Header");
// const GalleryComponent = require("../src/components/Gallery");

export default {
  title: "Organisms",
};

export const Header = () => {
  const container = document.createElement("div");

  ReactDOM.render(
    html`<${HeaderComponent}
      onInputChange=${(value) => console.log("input: ", value)}
    />`,
    container
  );

  return container;
};

export const Gallery = () => {
  const container = document.createElement("div");

  // ReactDOM.render(
  //   html`<${StartPageComponent}
  //     onSelectRootFolderPath=${() => console.log("select root path")}
  //   />`,
  //   container
  // );

  return container;
};
