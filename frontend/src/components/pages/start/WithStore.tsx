import React from "react";

import StartPage from "./Page";
import { sendToBackend } from "../../../message-bus";
import { MessageType } from "../../../../shared/message-passing";

const WithStore = () => {
  const onSelectRootFolderPath = async () => {
    const { dialog } = window.require("electron").remote;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    const rootFolderPath = filePaths ? filePaths[0] : null;

    if (!rootFolderPath) return;

    sendToBackend({
      type: MessageType.BE_INITIALIZE_PROJECT,
      payload: rootFolderPath,
    });
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
