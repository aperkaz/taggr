import React from "react";
import { Story, Meta } from "@storybook/react";

import FiltersLoadingComp from "./FiltersLoading";

export default {
  title: "Organisms/Filters",
  component: FiltersLoadingComp,
} as Meta;

const Template: Story<React.ComponentProps<typeof FiltersLoadingComp>> = (
  args
) => <FiltersLoadingComp {...args} />;

export const FiltersLoading = Template.bind({});
FiltersLoading.args = {
  current: 10,
  total: 37,
};
