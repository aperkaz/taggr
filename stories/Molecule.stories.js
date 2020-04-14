import React from "react";
import { action } from "@storybook/addon-actions";
import ImageTileComp from "../src/components/ImageTile";
import MenuComp from "../src/components/Menu";

export default {
  title: "Molecules",
  components: [ImageTileComp, MenuComp],
};

export const Image = () => (
  <div>
    <h2>In 200px x 200px container (with load animation)</h2>
    <div style={{ height: "200px", width: "200px" }}>
      <ImageTileComp imageUrl="https://images.unsplash.com/photo-1544627836-822bfe450209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=7500&q=80"></ImageTileComp>
    </div>
  </div>
);

export const Menu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let menuProps = {
    options: [
      { text: "Option 1", onClick: action("select option 1") },
      { text: "Option 2", onClick: action("select option 2") },
    ],
    onClose: () => triggerMenuClose(),
  };

  function triggerMenuOpen(e) {
    console.log(e.currentTarget);
    setAnchorEl(e.currentTarget);
    console.log(menuProps);
  }

  function triggerMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <button onClick={triggerMenuOpen}>Trigger menu</button>
      <MenuComp {...menuProps} anchorEl={anchorEl}></MenuComp>
    </div>
  );
};
