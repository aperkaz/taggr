const { html } = require("htm/react");
const { renderElementInContainer } = require("./utils");

const HeaderComponent = require("../src/components/organisms/Header");
const GalleryComponent = require("../src/components/organisms/Gallery");

const imageList = require("./mocks/imageList");

export default {
  title: "Organisms",
};

export const Header = () =>
  renderElementInContainer(
    html`<${HeaderComponent}
      onInputChange=${(value) => console.log("input: ", value)}
    />`
  );

export const Gallery = () =>
  renderElementInContainer(
    html` <div>
      <div>Within 400px height container</div>
      <div style=${{ height: "400px" }}>
        <${GalleryComponent} imageList=${imageList} />
      </div>
    </div>`
  );
