import React from "react";
import { action } from "@storybook/addon-actions";
import MainPageComp from "../src/components/MainPage";
import FullHeight from "./utils";

export default {
  title: "MainPage",
  component: MainPageComp,
};

export const MainPage = () => (
  <FullHeight>
    <MainPageComp onChange={action("input text changed")} />
  </FullHeight>
);
