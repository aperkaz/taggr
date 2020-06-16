import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";

import HeaderComp from "./Header";
// TODO: add TaskProgress story here
import NavBarComp from "./NavBar";
import GalleryComp from "./Gallery";
import MapComp from "./Map";
import FacesComp from "./Faces";
import FiltersComp from "./Filters";

import FullHeight from "../../stories/utils";
import { images, imagesWithLocation } from "../../stories/mocks/imageList";

export default {
  title: "Organisms",
  decorators: [withKnobs],
};

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
    onFiltersClick={action("click filters")}
    onSettingsClick={action("click settings")}
  />
);

export const NavBar = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <NavBarComp
      tabList={["Timeline", "Gallery", "Map"]}
      activeTab={activeTab}
      handleChange={(t) => {
        console.log(t);
        setActiveTab(t);
      }}
    />
  );
};

export const Gallery = () => (
  <FullHeight>
    <GalleryComp imageList={images} />
  </FullHeight>
);

export const Map = () => (
  <FullHeight>
    <MapComp
      imageList={imagesWithLocation.filter(
        (i) => i.location && i.location.latitude
      )}
    />
  </FullHeight>
);

export const Faces = () => (
  <FullHeight>
    <FacesComp />
  </FullHeight>
);

export const Filters = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open filters</button>
      <FiltersComp
        isOpen={isOpen}
        triggerFiltersClose={() => setIsOpen(false)}
        triggerSearch={(filters) => console.log("searching for: ", filters)}
      />
    </div>
  );
};
