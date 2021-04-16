import React from "react";

import StartPage from "./Page";
import messageHandler from "../../../message-handler";
import { MESSAGE_CREATORS } from "../../../../shared/message-passing";

const WithStore = () => {
  const onSelectRootFolderPath = async () => {
    const { dialog } = window.require("electron").remote;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    const rootFolderPath = filePaths ? filePaths[0] : null;

    if (!rootFolderPath) return;

    messageHandler.postMessage(
      MESSAGE_CREATORS.BE_initializeProject(rootFolderPath)
    );
  };

  const onSelectLogo = () => {
    const { shell } = window.require("electron");
    shell.openExternal("https://taggr.ai");
  };

  return (
    <StartPage
      onSelectRootFolderPath={onSelectRootFolderPath}
      onSelectLogo={onSelectLogo}
    />
  );
};

export default WithStore;
