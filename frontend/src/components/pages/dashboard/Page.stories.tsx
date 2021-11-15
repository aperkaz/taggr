import React from "react";
import { Story, Meta } from "@storybook/react";

import PageComp from "./Page";

import { images, imagesWithLocation } from "../../../stories/mocks/imageList";

export default {
  title: "Pages/Dashboard",
  component: PageComp,
  argTypes: {
    onSettingsClick: {
      action: "onSettingsClick",
    },
    onSearchTriggered: {
      action: "onSearchTriggered",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof PageComp>> = (args) => (
  <PageComp {...args} />
);

export const Dashboard = Template.bind({});
Dashboard.args = {
  images,
  imagesWithLocation,
};
