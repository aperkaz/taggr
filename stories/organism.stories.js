const { html } = require("htm/react");
const ReactDOM = require("react-dom");

const HeaderComponent = require("../src/components/Header");
const GalleryComponent = require("../src/components/Gallery");

const imageList = require("./mocks/imageList");

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

  ReactDOM.render(
    html` <div>
      <div>Within 400px height container</div>
      <div style=${{ height: "400px" }}>
        <${GalleryComponent} imageList=${imageList} />
      </div>
    </div>`,
    container
  );

  return container;
};
