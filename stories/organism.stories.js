const { html } = require("htm/react");
const { renderElementInContainer } = require("./utils");

const HeaderComponent = require("../src/components/organisms/Header");
const GalleryComponent = require("../src/components/organisms/Gallery");
const VirtualizedGalleryComponent = require("../src/components/organisms/VirtualizedGallery");

export default {
  title: "Organisms",
};

export const Header = () =>
  renderElementInContainer(
    html`<${HeaderComponent}
      onInputChange=${(value) => console.log("input: ", value)}
    />`
  );

export const Gallery = () => {
  const imageList = require("./mocks/imageList");

  return renderElementInContainer(
    html` <div>
      <div>Within 400px height container</div>
      <div style=${{ height: "400px" }}>
        <${GalleryComponent} imageList=${imageList} />
      </div>
    </div>`
  );
};

export const VirtualizedGallery = () => {
  let imageList = require("./mocks/imageList");

  // imageList[imageList.length - 1] = { hash: "16", path: null, tags: [] };

  console.log(imageList);
  return renderElementInContainer(
    html` <div style=${{ height: "100%" }}>
      <${VirtualizedGalleryComponent} imageList=${imageList} />
    </div>`
  );
};
