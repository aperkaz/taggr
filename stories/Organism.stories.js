import React from "react";
import HeaderComp from "../src/components/organisms/Header";
import VirtualizedGalleryComp from "../src/components/organisms/VirtualizedGallery";
import imageList from "./mocks/imageList";

// import FullHeight from "./utils";
// import imageList from "./mocks/imageList";

export default {
  title: "Organisms",
  // components: ImageGalleryComp,
};

export const Header = () => (
  <HeaderComp
    onInputChange={(value) => console.log("input: ", value)}
    onPressReset={() => console.log("reset pressed")}
    tagCountList={[
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
);

export const HeaderProcessing = () => (
  <HeaderComp
    onInputChange={(value) => console.log("input: ", value)}
    onPressReset={() => console.log("reset pressed")}
    tagProcessingStatus="Processing 321 / 684"
  />
);

export const VirtualizedGallery = () => (
  <div style={{ height: "100%" }}>
    <VirtualizedGalleryComp imageList={imageList} />
  </div>
);
