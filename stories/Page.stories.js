import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/components/pages/StartPage";
import DashboardPageComp from "../src/components/pages/DashboardPage";
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
    <DashboardPageComp filteredImageList={imageList} />
  </FullHeight>
);
