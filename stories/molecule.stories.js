const { html } = require("htm/react");
const { renderElementInContainer } = require("./utils");

const ImageTileComponent = require("../src/components/molecules/ImageTile");

export default {
  title: "Molecules",
};

export const ImageTile = () =>
  renderElementInContainer(
    html` <div style=${{ height: "200px", width: "200px" }}>
      <${ImageTileComponent}
        imageUrl="https://images.unsplash.com/photo-1577628208759-4ee69c26dadc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5650&q=80"
      />
    </div>`
  );
