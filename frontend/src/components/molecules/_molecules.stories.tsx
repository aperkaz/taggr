import React from "react";
import { Story } from "@storybook/react";

import ButtonFancyComp from "./ButtonFancy";
import ButtonFilterComp from "./ButtonFilter";
import ButtonRegularComp from "./ButtonRegular";
import ImageTileComp from "./ImageTile";
import LoadingComp from "./Loading";

export default {
  title: "Molecules",
  argTypes: {
    onClick: { action: "onClick press" },
  },
};

const TemplateButtonFancy: Story<React.ComponentProps<typeof ButtonFancyComp>> =
  (args) => <ButtonFancyComp {...args} />;

export const ButtonFancy = TemplateButtonFancy.bind({});
ButtonFancy.args = {
  text: "Button fancy",
};

const TemplateButtonFilter: Story<
  React.ComponentProps<typeof ButtonFilterComp>
> = (args) => <ButtonFilterComp {...args} />;

export const ButtonFilter = TemplateButtonFilter.bind({});
ButtonFilter.args = {
  text: "Button filter",
};

const TemplateButtonRegular: Story<
  React.ComponentProps<typeof ButtonRegularComp>
> = (args) => <ButtonRegularComp {...args} />;

export const ButtonRegular = TemplateButtonRegular.bind({});
ButtonRegular.args = {
  text: "Button regular",
};

const TemplateImageTile: Story<React.ComponentProps<typeof ImageTileComp>> = (
  args
) => (
  <div style={{ height: "200px", width: "200px", padding: "15px" }}>
    <ImageTileComp {...args} />
  </div>
);
export const ImageTile = TemplateImageTile.bind({});
ImageTile.args = {
  url: "https://images.unsplash.com/photo-1544627836-822bfe450209?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=7500&q=80",
};

const TemplateLoading: Story<React.ComponentProps<typeof LoadingComp>> = (
  args
) => <LoadingComp {...args} />;

export const Loading = TemplateLoading.bind({});
Loading.args = {
  text: "Animation text",
  animationDuration: 6,
};
