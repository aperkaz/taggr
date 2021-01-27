import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, number, array } from "@storybook/addon-knobs";
import StartPageComp from "./start/Page";
import ProcessingPageComp from "./processing/Page";
import MainPageComp from "./main/Page";
import SettingsPageComp from "./settings/Page";

import { images, imagesWithLocation } from "../../stories/mocks/imageList";

export default {
  title: "Pages",
  decorators: [withKnobs],
};

export const Start = () => (
  <StartPageComp
    onSelectRootFolderPath={action("trigger folder selection dialog")}
    onSelectLogo={action("trigger navigation to webpage")}
  />
);

export const Processing = () => (
  <ProcessingPageComp
    memoryNumber={text("memory number:", "531")}
    handleSelectLogo={action("trigger navigation to webpage")}
  />
);

export const Main = () => (
  <MainPageComp
    onSettingsClick={action("trigger navigate to settings")}
    onSearchTriggered={action("filter search has been triggered")}
    images={array("images", images)}
    imagesWithLocation={array("imagesWithLocation", imagesWithLocation)}
  />
);

export const Settings = () => (
  <SettingsPageComp
    onSelectReset={action("trigger reset")}
    onSelectSave={action("trigger save")}
    onOpenLink={action("open link")}
  />
);
