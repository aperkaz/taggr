import React from "react";
import { action } from "@storybook/addon-actions";
import SeachInputComp from "../src/components/SearchInput";
import FullHeight from "./utils";

export default {
  title: "Input",
  component: SeachInputComp,
};

export const SearchInput = () => (
  <SeachInputComp onChange={action("input text changed")} />
);

export const FullParent = () => <FullHeight>hi</FullHeight>;

// export const Text = () => (
//   <Button onClick={action("clicked")}>Hello Button</Button>
// );

// export const Emoji = () => (
//   <Button onClick={action("clicked")}>
//     <span role="img" aria-label="so cool">
//       😀 😎 👍 💯
//     </span>
//   </Button>
// );
