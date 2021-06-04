import React from "react";
import { Story, Meta } from "@storybook/react";

import ButtonFancyComp from "./ButtonFancy";
import ButtonRegularComp from "./ButtonRegular";
import ButtonFilterComp from "./ButtonFilter";
import ImageTileComp from "./ImageTile";
import LoadingComp from "./Loading";
import ProgressBarComp from "./ProgressBar";
import UpdateModalComp from "./UpdateModal";

export default {
  title: "Molecules",
  argTypes: { onClick: { action: "clicked" } },
  parameters: {
    layout: "centered",
  },
} as Meta;

const TemplateButtonFancy: Story<
  React.ComponentProps<typeof ButtonFancyComp>
> = (args) => <ButtonFancyComp {...args} />;
export const ButtonFancy = TemplateButtonFancy.bind({});
ButtonFancy.args = {
  text: "Press me",
};

const TemplateButtonRegular: Story<
  React.ComponentProps<typeof ButtonRegularComp>
> = (args) => <ButtonRegularComp {...args} />;
export const ButtonRegular = TemplateButtonRegular.bind({});
ButtonRegular.args = {
  text: "Press me",
  style: {
    background: "grey",
  },
};

const TemplateButtonFilter: Story<
  React.ComponentProps<typeof ButtonFilterComp>
> = (args) => <ButtonFilterComp {...args} />;
export const ButtonFilter = TemplateButtonFilter.bind({});
ButtonFilter.args = {
  text: "🐶 Animals",
  active: true,
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
  imageUrl:
    "https://images.unsplash.com/photo-1619435127168-3dd7e5bc48fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
};

const TemplateLoading: Story<React.ComponentProps<typeof LoadingComp>> = (
  args
) => (
  <div style={{ height: "300px", width: "300px", padding: "15px" }}>
    <LoadingComp {...args} />
  </div>
);
export const Loading = TemplateLoading.bind({});
Loading.args = {
  animationDuration: 8,
  text: "No pictures found, try to change the filters.",
};

const TemplateProgressBar: Story<
  React.ComponentProps<typeof ProgressBarComp>
> = (args) => (
  <div style={{ height: "300px", width: "300px", padding: "15px" }}>
    <ProgressBarComp {...args} />
  </div>
);
export const ProgressBar = TemplateProgressBar.bind({});
ProgressBar.args = {
  percentage: 60,
};

const TemplateUpdateModal: Story<
  React.ComponentProps<typeof UpdateModalComp>
> = (args) => <UpdateModalComp {...args} />;
export const UpdateModal = TemplateUpdateModal.bind({});
UpdateModal.args = {
  currentAppVersion: "v0.0.0",
  latestAppVersion: "v0.0.1",
};
