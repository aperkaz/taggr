import React from "react";
import { Story } from "@storybook/react";

import HeaderComp from "./Header";
import GalleryComp from "./Gallery";
import MapComp from "./Map";
import NavBarComp from "./NavBar";
import FiltersComp from "./Filters";

import { images, imagesWithLocation } from "../../stories/mocks/imageList";
import { types } from "taggr-shared";

export default {
  title: "Organisms",
  argTypes: {
    onFiltersClick: "onFiltersClick",
    onSettingsClick: "onSettingsClick",
    onFilterChange: { action: "onFilterChange" },
    onActiveTabChange: { action: "onActiveTabChange" },
  },
};

const TemplateFilters: Story<React.ComponentProps<typeof FiltersComp>> = (
  args
) => <FiltersComp {...args} />;

export const Filters = TemplateFilters.bind({});
Filters.args = {};
Filters.parameters = {
  layout: "centered",
};

const TemplateHeader: Story<React.ComponentProps<typeof HeaderComp>> = (
  args
) => <HeaderComp {...args} />;

export const Header = TemplateHeader.bind({});
Header.args = {
  tabList: ["Timeline", "Gallery", "Map"],
  activeTab: 1,
};

const TemplateGallery: Story<React.ComponentProps<typeof GalleryComp>> = (
  args
) => <GalleryComp {...args} />;

export const Gallery = TemplateGallery.bind({});
Gallery.args = {
  imageList: images,
};
Gallery.parameters = {
  layout: "fullscreen",
};

const TemplateMap: Story<React.ComponentProps<typeof MapComp>> = (args) => (
  <MapComp {...args} />
);

export const Map = TemplateMap.bind({});
Map.args = {
  imageList: imagesWithLocation as types.Image[],
};

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
