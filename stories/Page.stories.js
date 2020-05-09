import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/renderer/components/pages/StartPage";
import DashboardPageComp from "../src/renderer/components/pages/DashboardPage";
import FullHeight from "./utils";
import imageList from "./mocks/imageList";

export default {
  title: "Pages",
};

export const StartPage = () => (
  <FullHeight>
    <StartPageComp
      onSelectRootFolderPath={action("trigger folder selection dialog")}
    />
  </FullHeight>
);

export const DashboardPage = () => (
  <FullHeight>
    <DashboardPageComp images={imageList} />
  </FullHeight>
);
