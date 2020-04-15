import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/components/StartPage";
// import { DashboardPage as DashboardPageComp } from "../src/components/DashboardPage";
import FullHeight from "./utils";
import imageList from "./mocks/imageList";

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

// export const DashboardPage = () => (
//   <FullHeight>
//     <DashboardPageComp imageList={imageList} />
//   </FullHeight>
// );
