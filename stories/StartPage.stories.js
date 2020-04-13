import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/components/StartPage";
import FullHeight from "./utils";

export default {
  title: "StartPage",
  component: StartPageComp,
};

export const MainPage = () => (
  <FullHeight>
    <StartPageComp
      onSelectRootFolderPath={action("trigger folder selection dialog")}
    />
  </FullHeight>
);
