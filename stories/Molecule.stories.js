import React from "react";
import { action } from "@storybook/addon-actions";
import SearchInput from "../src/components/SearchInput";

export default {
  title: "Molecules",
  components: SearchInput,
};

export const TagInput = () => (
  <SearchInput onChange={action("trigger search")} />
);

export const Image = () => <div>an image</div>;
