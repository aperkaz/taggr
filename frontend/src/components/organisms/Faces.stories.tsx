import React from "react";
import { Story, Meta } from "@storybook/react";

import FacesComp from "./Faces";

export default {
  title: "Organisms/Faces",
  component: FacesComp,
} as Meta;

const Template: Story<React.ComponentProps<typeof FacesComp>> = () => (
  <FacesComp />
);

export const Faces = Template.bind({});
Faces.args = {
  user: {},
};
