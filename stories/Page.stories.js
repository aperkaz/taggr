import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/components/StartPage";
import MainPageComp from "../src/components/MainPage";
import FullHeight from "./utils";

export default {
  title: "Pages",
  component: StartPageComp,
};

export const StartPage = () => (
  <FullHeight>
    <StartPageComp
      onSelectRootFolderPath={action("trigger folder selection dialog")}
    />
  </FullHeight>
);

export const MainPage = () => (
  <FullHeight>
    <MainPageComp />
  </FullHeight>
);
