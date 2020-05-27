import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

import NavBarComp from "./NavBar";
import MapComp from "./Map";
import HeaderComp from "./Header";
import GalleryComp from "./Gallery";

import FullHeight from "../../../../stories/utils";
import imageList from "../../../../stories/mocks/imageList";

export default {
  title: "Organisms",
  decorators: [withKnobs],
};

export const NavBar = () => (
  <NavBarComp onSettingsClick={action("click settings")} />
);

export const Header = () => (
  <HeaderComp
    task={{
      isOngoing: boolean("isTaskOngoing", false),
      name: text(
        "taskName",
        "Be patient, the minions are working on your memories!"
      ),
      percentage: number("taskPercentage", 50),
    }}
    onFilterChange={action("trigger backend result filter")}
  />
);

export const Gallery = () => (
  <FullHeight>
    <GalleryComp imageList={imageList} />
  </FullHeight>
);

export const Map = () => (
  <FullHeight>
    <MapComp
      imageList={imageList.filter((i) => i.location && i.location.latitude)}
    />
  </FullHeight>
);
