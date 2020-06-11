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

export const NavBar = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <NavBarComp
      value={activeTab}
      tabs={["Timeline", "Gallery", "Map"]}
      onChange={(t) => {
        console.log(t);
        setActiveTab(t);
      }}
    />
  );
};

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

export const Filters = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>open filters</button>
      <FiltersComp isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
