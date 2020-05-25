import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import HeaderComp from "../src/renderer/components/organisms/Header";
import SearchComp from "../src/renderer/components/organisms/Search";
import VirtualizedGalleryComp from "../src/renderer/components/organisms/VirtualizedGallery";
import MapComp from "../src/renderer/components/organisms/Map";
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
    task={{
      isOngoing: boolean("isTaskOngoing", false),
      name: text(
        "taskName",
        "Be patient, the minions are working on your memories!"
      ),
      percentage: number("taskPercentage", 50),
    }}
    onInputChange={action("input change")}
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
    <MapComp
      imageList={imageList.filter((i) => i.location && i.location.latitude)}
      onImageSelect={action(`select image`)}
    />
  </FullHeight>
);
