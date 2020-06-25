import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, number, text } from "@storybook/addon-knobs";

import HeaderComp from "./Header";
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

export const Header = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div style={{ width: "100%" }}>
      <HeaderComp
        tabList={["Faces", "Gallery", "Map"]}
        activeTab={activeTab}
        onActiveTabChange={(t) => {
          action(`active tab changed`)(t);
          setActiveTab(t);
        }}
        onSettingsClick={action("trigger action click")}
      />
    </div>
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
