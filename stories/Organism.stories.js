import React from "react";
import { action } from "@storybook/addon-actions";
import HeaderComp from "../src/renderer/components/organisms/Header";
import VirtualizedGalleryComp from "../src/renderer/components/organisms/VirtualizedGallery";
import MapComp from "../src/renderer/components/organisms/Map";
import imageList from "./mocks/imageList";

import FullHeight from "./utils";

export default {
  title: "Organisms",
};

export const Header = () => (
  <HeaderComp
    onInputChange={action("input change")}
    onPressReset={action("press reset")}
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
    onInputChange={action("input change")}
    onPressReset={action("press reset")}
    tagProcessingStatus="Processing 321 / 684"
  />
);

export const VirtualizedGallery = () => (
  <FullHeight>
    <VirtualizedGalleryComp imageList={imageList} />
  </FullHeight>
);

export const Map = () => (
  <FullHeight>
    <MapComp images={imageList} onImageSelect={action(`select image`)} />
  </FullHeight>
);
