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
import ProcessingPageComp from "./processing/Page";
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

export const Processing = () => (
  <FullHeight>
    <ProcessingPageComp
      title={text("title", "Locating 192 memories")}
      subtitle={text("subtitle", "This may take some time, be patient!")}
      percentage={number("processPercentage", 10)}
    />
  </FullHeight>
);

export const Main = () => (
  <FullHeight>
    <MainPageComp
      onSettingsClick={action("trigger navigate to settings")}
      onSearchTriggered={action("filter search has been triggered")}
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
