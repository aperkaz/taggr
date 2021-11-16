import React from "react";
import { Story, Meta } from "@storybook/react";

import PageComp from "./Page";

export default {
  title: "Pages",
  component: PageComp,
  argTypes: {
    onSelectRootFolderPath: { action: "onSelectRootFolderPath" },
    onSelectLogo: { action: "onSelectLogo" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof PageComp>> = (args) => (
  <PageComp {...args} />
);

export const Start = Template.bind({});
Start.args = {};
