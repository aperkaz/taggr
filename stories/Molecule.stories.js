import React from "react";
import { action } from "@storybook/addon-actions";
import SearchInputComp from "../src/components/SearchInput";
import ImageTileComp from "../src/components/ImageTile";

export default {
  title: "Molecules",
  components: [SearchInputComp, ImageTileComp],
};

export const SearchInput = () => (
  <SearchInputComp onChange={action("trigger search")} />
);

export const Image = () => (
  <div>
    <h2>In 200px x 200px container</h2>
    <div style={{ height: "200px", width: "200px" }}>
      <ImageTileComp imageUrl="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=660&q=80"></ImageTileComp>
    </div>
  </div>
);
