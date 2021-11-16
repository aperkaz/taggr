import React from "react";
import { Story, Meta } from "@storybook/react";

import PageComp from "./Page";

export default {
  title: "Pages/Settings",
  component: PageComp,
  argTypes: {
    onBrowseMore: { action: "onBrowseMore" },
    onSelectDestroy: { action: "onSelectDestroy" },
    onSelectBack: { action: "onSelectBack" },
    onOpenLink: { action: "onOpenLink" },
    onSelectFollow: { action: "onSelectFollow" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof PageComp>> = (args) => (
  <PageComp {...args} />
);

export const Settings = Template.bind({});
Settings.args = {};
