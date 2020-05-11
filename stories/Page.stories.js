import React from "react";
import { action } from "@storybook/addon-actions";
import StartPageComp from "../src/renderer/components/pages/start/Page";
import MainPageComp from "../src/renderer/components/pages/main/Page";
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

export const MainPage = () => (
  <FullHeight>
    <MainPageComp images={imageList} />
  </FullHeight>
);
