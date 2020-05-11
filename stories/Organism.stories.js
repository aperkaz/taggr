import React from "react";
import { action } from "@storybook/addon-actions";
import HeaderComp from "../src/renderer/components/shared/Header";
import SearchComp from "../src/renderer/components/shared/Search";
import VirtualizedGalleryComp from "../src/renderer/components/shared/VirtualizedGallery";
import MapComp from "../src/renderer/components/shared/Map";
import imageList from "./mocks/imageList";

import FullHeight from "./utils";

export default {
  title: "Organisms",
};

export const Header = () => (
  <HeaderComp onSettingsClick={action("click settings")} />
);

export const Search = () => (
  <SearchComp
    onInputChange={action("input change")}
    onPressReset={action("press reset")}
    tagProcessingStatus="Processing 321 / 684"
  />
);

export const SearchProcessing = () => (
  <SearchComp
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
