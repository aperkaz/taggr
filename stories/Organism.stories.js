import React from "react";
import { action } from "@storybook/addon-actions";
// import ImageGalleryComp from "../src/components/DashboardImageGallery";
import HeaderComp from "../src/components/organisms/Header";
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

// export const HeaderProcessing = () => (
//   <HeaderComponent
//     onInputChange={(value) => console.log("input: ", value)}
//     onPressReset={() => console.log("reset pressed")}
//     tagProcessingStatus="Processing 321 / 684"
//     tagCountList={[
//       { name: "dogs", count: 220 },
//       { name: "cats", count: 119 },
//       { name: "party", count: 50 },
//       { name: "suit", count: 21 },
//       { name: "beer", count: 13 },
//       { name: "pizza", count: 9 },
//       { name: "forest", count: 5 },
//       { name: "sea", count: 2 },
//       { name: "dolphin", count: 1 },
//     ]}
//   />
// );

// export const VirtualizedGallery = () => {
//   let imageList = require("./mocks/imageList");

//   // imageList[imageList.length - 1] = { hash: "16", path: null, tags: [] };

//   console.log(imageList);
//   return (
//     <div style={{ height: "100%" }}>
//       <VirtualizedGalleryComponent imageList={imageList} />
//     </div>
//   );
// };
