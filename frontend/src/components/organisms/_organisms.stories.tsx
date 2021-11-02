import React from "react";
import { Story } from "@storybook/react";

import HeaderComp from "./Header";
import GalleryComp from "./Gallery";
import MapComp from "./Map";
import NavBarComp from "./NavBar";
// import FiltersComp from "./Filters";

import { images, imagesWithLocation } from "../../stories/mocks/imageList";

export default {
  title: "Organisms",
  argTypes: {
    onFiltersClick: "onFiltersClick press",
    onSettingsClick: "onSettingsClick press",
  },
};

const TemplateHeader: Story<React.ComponentProps<typeof HeaderComp>> = (
  args
) => <HeaderComp {...args} />;

export const Header = TemplateHeader.bind({});
Header.args = {
  task: {
    isOngoing: false,
    name: "Be patient, the minions are working on your memories!",
    percentage: 50,
  },
};

const TemplateGallery: Story<React.ComponentProps<typeof GalleryComp>> = (
  args
) => <GalleryComp {...args} />;

export const Gallery = TemplateGallery.bind({});
Gallery.args = {
  imageList: images,
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

// export const Filters = () => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsOpen(true)}>open filters</button>
//       <FiltersComp
//         isOpen={isOpen}
//         triggerFiltersClose={() => setIsOpen(false)}
//         triggerSearch={(filters) => console.log("searching for: ", filters)}
//       />
//     </div>
//   );
// };
