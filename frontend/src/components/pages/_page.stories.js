import React from "react";
import { action } from "@storybook/addon-actions";
import {
  withKnobs,
  boolean,
  text,
  number,
  array,
} from "@storybook/addon-knobs";
import StartPageComp from "./start/Page";
import MainPageComp from "./main/Page";
import SettingsPageComp from "./settings/Page";
import PrepocessPage from "./preprocess/Page";

import FullHeight from "../../stories/utils";
import { images, imagesWithLocation } from "../../stories/mocks/imageList";

export default {
  title: "Pages",
  decorators: [withKnobs],
};

export const Start = () => (
  <FullHeight>
    <StartPageComp
      onSelectRootFolderPath={action("trigger folder selection dialog")}
      onSelectLogo={action("trigger navigation to webpage")}
    />
  </FullHeight>
);

export const Preprocess = () => (
  <FullHeight>
    <PrepocessPage
      memoryNumber={text("memoryNumber", '1832')}
      onSelectLogo={action("trigger navigation to webpage")}
    />
  </FullHeight>
);

export const Main = () => (
  <FullHeight>
    <MainPageComp
      onSettingsClick={action("trigger navigate to settings")}
      onSearchTriggered={action("filter search has been triggered")}
      task={{
        isOngoing: boolean("isTaskOngoing", true),
        name: text(
          "taskName",
          "Be patient, the minions are working on your memories!"
        ),
        percentage: number("taskPercentage", 50),
      }}
      images={array("images", images)}
      imagesWithLocation={array("imagesWithLocation", imagesWithLocation)}
    />
  </FullHeight>
);

export const Settings = () => (
  <FullHeight>
    <SettingsPageComp
      onSelectReset={action("trigger reset")}
      onSelectSave={action("trigger save")}
      onOpenLink={action("open link")}
      // onSelectSupport={action("trigger support")}
    />
  </FullHeight>
);
