import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import HeaderComp from "../src/renderer/components/shared/Header";
import SearchComp from "../src/renderer/components/shared/Search";
import VirtualizedGalleryComp from "../src/renderer/components/shared/VirtualizedGallery";
import MapComp from "../src/renderer/components/shared/Map";
import imageList from "./mocks/imageList";

import FullHeight from "./utils";

export default {
  title: "Organisms",
  decorators: [withKnobs],
};

export const Header = () => (
  <HeaderComp onSettingsClick={action("click settings")} />
);

export const Search = () => (
  <SearchComp
    isTaskOngoing={boolean("isTaskOngoing", false)}
    taskName={text(
      "taskName",
      "Be patient, the minions are working on your memories!"
    )}
    taskPercentage={number("taskPercentage", 50)}
    onInputChange={action("input change")}
    onPressReset={action("press reset")}
    tagCountList={[
      { name: "tag1", count: 11 },
      { name: "tag2", count: 6 },
    ]}
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
