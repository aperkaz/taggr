import React from "react";

import StartPage from "./Page";
import messageHandler from "../../../message-handler";
import MESSAGES_PASSING from "../../../../shared/message-passings";

const WithStore = () => {
  const onSelectRootFolderPath = async () => {
    const { dialog } = window.require("electron").remote;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    const rootFolderPath = filePaths ? filePaths[0] : null;

    if (!rootFolderPath) return;

    messageHandler.postMessage(
      MESSAGES_PASSING.MESSAGES.initializeProject(rootFolderPath)
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
