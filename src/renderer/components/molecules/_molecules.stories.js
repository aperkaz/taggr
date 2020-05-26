import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import ImageTileComp from "./ImageTile";
import UpdateModalComp from "./UpdateModal";

export default {
  title: "Molecules",
  decorators: [withKnobs],
};

export const ImageTile = () => (
  <div style={{ height: "200px", width: "200px", padding: "15px" }}>
    <ImageTileComp imageUrl="https://images.unsplash.com/photo-1544627836-822bfe450209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=7500&q=80"></ImageTileComp>
  </div>
);

export const UpdateModal = () => (
  <div>
    <UpdateModalComp
      currentAppVersion={text("currentAppVersion", "v0.0.0")}
      latestAppVersion={text("latestAppVersion", "v0.0.1")}
      onUpdateSelect={action("trigger update action")}
    />
  </div>
);
