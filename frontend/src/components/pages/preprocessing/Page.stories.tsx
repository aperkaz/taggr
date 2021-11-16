import React from "react";
import { Story, Meta } from "@storybook/react";

import PageComp from "./Page";

export default {
  title: "Pages/Preprocessing",
  component: PageComp,
  argTypes: {
    handleSelectLogo: { action: "handleSelectLogo" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<React.ComponentProps<typeof PageComp>> = (args) => (
  <PageComp {...args} />
);

export const Preprocessing = Template.bind({});
Preprocessing.args = {
  current: 0,
  total: 0,
};
