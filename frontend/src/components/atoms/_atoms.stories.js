import React from "react";

import Component from "./Typography";

export default {
  title: "Atoms",
  component: Component,
};

export const Typography = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Component variant="h1">h1. taggr typography</Component>
    <Component variant="h2">h2. taggr typography</Component>
    <Component variant="h3">h3. taggr typography</Component>
    <Component variant="h4">h4. taggr typography</Component>
    <Component variant="h5">h5. taggr typography</Component>
    <Component variant="h6">h6. taggr typography</Component>
    <Component variant="subtitle1">subtitle1. taggr typography</Component>
    <Component variant="subtitle2">subtitle2. taggr typography</Component>
    <Component variant="body1">body1. taggr typography</Component>
    <Component variant="body2">body2. taggr typography</Component>
    <Component variant="button">button. taggr typography</Component>
    <br />
    <Component variant="caption">caption. taggr typography</Component>
    <br />
    <Component variant="overline">overline. taggr typography</Component>
  </div>
);
export const TypographyColors = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Component variant="h1" style={{ color: "red" }}>
      h1. taggr typography
    </Component>
    <Component variant="h2" style={{ color: "blue" }}>
      h2. taggr typography
    </Component>
    <Component variant="h3" style={{ color: "grey" }}>
      h3. taggr typography
    </Component>
    <Component variant="h4">h4. taggr typography</Component>
    <Component variant="h5">h5. taggr typography</Component>
    <Component variant="h6">h6. taggr typography</Component>
    <Component variant="subtitle1">subtitle1. taggr typography</Component>
    <Component variant="subtitle2">subtitle2. taggr typography</Component>
    <Component variant="body1">body1. taggr typography</Component>
    <Component variant="body2">body2. taggr typography</Component>
    <Component variant="button">button. taggr typography</Component>
    <br />
    <Component variant="caption">caption. taggr typography</Component>
    <br />
    <Component variant="overline">overline. taggr typography</Component>
  </div>
);
