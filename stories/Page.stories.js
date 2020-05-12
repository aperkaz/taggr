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
      onSelectLogo={action("trigger navigation to webpage")}
    />
  </FullHeight>
);

export const MainPage = () => (
  <FullHeight>
    <MainPageComp
      onSettingsClick={action("navigate to settings")}
      task={{
        isOngoing: false,
        name: "Be patient, the robots are analysing your memories!",
        percentage: 0,
      }}
      onInputChange={action("input change")}
      onPressReset={action("reset press")}
      tags={[{ name: "tag1", count: 10 }]}
      images={imageList}
    />
  </FullHeight>
);

export const MainPageWithTask = () => (
  <FullHeight>
    <MainPageComp
      onSettingsClick={action("navigate to settings")}
      task={{
        isOngoing: true,
        name: "Be patient, the robots are analysing your memories!",
        percentage: 0,
      }}
      onInputChange={action("input change")}
      onPressReset={action("reset press")}
      tags={[{ name: "tag1", count: 10 }]}
      images={imageList}
    />
  </FullHeight>
);
