const { html } = require("htm/react");
const { renderElementInContainer } = require("./utils");

const ImageTileComponent = require("../src/components/molecules/ImageTile");
const TagCountDisplayComponent = require("../src/components/molecules/TagCountDisplay");

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

export const TagCountDisplay = () =>
  renderElementInContainer(
    html` <div style=${{ height: "200px", width: "100%" }}>
      <${TagCountDisplayComponent}
        tagCountList=${[
          { name: "dogs", count: 220 },
          { name: "cats", count: 119 },
          { name: "party", count: 50 },
          { name: "suit", count: 21 },
          { name: "beer", count: 13 },
          { name: "pizza", count: 9 },
          { name: "forest", count: 5 },
          { name: "sea", count: 2 },
          { name: "dolphin", count: 1 },
        ]}
      />
    </div>`
  );
