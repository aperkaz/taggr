import React from "react";
import { Story, Meta } from "@storybook/react";

import TypographyComp from "./Typography";

const TypographyDefault = () => (
  <div>
    <TypographyComp variant="h1">h1. taggr typography</TypographyComp>
    <TypographyComp variant="h2">h2. taggr typography</TypographyComp>
    <TypographyComp variant="h3">h3. taggr typography</TypographyComp>
    <TypographyComp variant="h4">h4. taggr typography</TypographyComp>
    <TypographyComp variant="h5">h5. taggr typography</TypographyComp>
    <TypographyComp variant="h6">h6. taggr typography</TypographyComp>
    <TypographyComp variant="subtitle1">
      subtitle1. taggr typography
    </TypographyComp>
    <TypographyComp variant="subtitle2">
      subtitle2. taggr typography
    </TypographyComp>
    <TypographyComp variant="body1">body1. taggr typography</TypographyComp>
    <TypographyComp variant="body2">body2. taggr typography</TypographyComp>
    <TypographyComp variant="button">button. taggr typography</TypographyComp>
    <br />
    <TypographyComp variant="caption">caption. taggr typography</TypographyComp>
    <br />
    <TypographyComp variant="overline">
      overline. taggr typography
    </TypographyComp>
  </div>
);

const TypographyColors = () => (
  <div>
    <TypographyComp variant="h1" style={{ color: "red" }}>
      h1. taggr typography
    </TypographyComp>
    <TypographyComp variant="h2" style={{ color: "blue" }}>
      h2. taggr typography
    </TypographyComp>
    <TypographyComp variant="h3" style={{ color: "grey" }}>
      h3. taggr typography
    </TypographyComp>
    <TypographyComp variant="h4">h4. taggr typography</TypographyComp>
    <TypographyComp variant="h5">h5. taggr typography</TypographyComp>
    <TypographyComp variant="h6">h6. taggr typography</TypographyComp>
    <TypographyComp variant="subtitle1">
      subtitle1. taggr typography
    </TypographyComp>
    <TypographyComp variant="subtitle2">
      subtitle2. taggr typography
    </TypographyComp>
    <TypographyComp variant="body1">body1. taggr typography</TypographyComp>
    <TypographyComp variant="body2">body2. taggr typography</TypographyComp>
    <TypographyComp variant="button">button. taggr typography</TypographyComp>
    <br />
    <TypographyComp variant="caption">caption. taggr typography</TypographyComp>
    <br />
    <TypographyComp variant="overline">
      overline. taggr typography
    </TypographyComp>
  </div>
);

export default {
  title: "Atoms",
} as Meta;

const TemplateDefault: Story<typeof TypographyDefault> = () => (
  <TypographyDefault />
);
const TemplateColors: Story<typeof TypographyColors> = () => (
  <TypographyColors />
);

export const Default = TemplateDefault.bind({});
TypographyDefault.args = {};

export const Colors = TemplateColors.bind({});
TypographyColors.args = {};
