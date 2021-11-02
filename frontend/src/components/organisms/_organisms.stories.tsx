import React from "react";
import { Story } from "@storybook/react";

import HeaderComp from "./Header";
import GalleryComp from "./Gallery";
import MapComp from "./Map";
import NavBarComp from "./NavBar";
import FiltersComp from "./Filters";
import FiltersLoadingComp from "./FiltersLoading";

import { images, imagesWithLocation } from "../../stories/mocks/imageList";

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

const TemplateFiltersLoading: Story<
  React.ComponentProps<typeof FiltersLoadingComp>
> = (args) => <FiltersLoadingComp {...args} />;

export const FiltersLoading = TemplateFiltersLoading.bind({});
FiltersLoading.args = {
  current: 10,
  total: 37,
};
FiltersLoading.parameters = {
  layout: "centered",
};

const TemplateHeader: Story<React.ComponentProps<typeof HeaderComp>> = (
  args
) => <HeaderComp {...args} />;

export const Header = TemplateHeader.bind({});
Header.args = {
  tabList: ["Timeline", "Gallery", "Map"],
  activeTab: 1,
  showSettings: true,
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
  imageList: imagesWithLocation,
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
