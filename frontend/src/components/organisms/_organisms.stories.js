import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import HeaderComp from "./Header";
import NavBarComp from "./NavBar";
import GalleryComp from "./Gallery";
import MapComp from "./Map";
import FiltersComp from "./Filters";

import FullHeight from "../../stories/utils";
import imageList from "../../stories/mocks/imageList";

export default {
  title: "Organisms",
  decorators: [withKnobs],
};

export const Header = () => (
  <HeaderComp
    onFiltersClick={action("click filters")}
    onSettingsClick={action("click settings")}
  />
);

export const NavBar = () => (
  <NavBarComp
    activeTab={1}
    tabs={["Timeline", "Gallery", "Map"]}
    selectTab={action("selected")}
  />
);

// TODONOW: remove and clean up
// export const FiltersTodo = () => (
//   <FiltersComp
//     task={{
//       isOngoing: boolean("isTaskOngoing", false),
//       name: text(
//         "taskName",
//         "Be patient, the minions are working on your memories!"
//       ),
//       percentage: number("taskPercentage", 50),
//     }}
//     onFilterChange={action("trigger backend result filter")}
//   />
// );

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

export const Filters = () => (
  <FullHeight>
    <div>some content</div>
    <FiltersComp />
  </FullHeight>
);
