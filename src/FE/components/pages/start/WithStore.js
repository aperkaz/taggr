import React from "react";

import StartPage from "./Page";
// import * as services from "../../../services";

const WithStore = () => {
  const onSelectRootFolderPath = async () => {
    const { dialog } = window.require("electron").remote;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    const projectRootFolderPath = filePaths ? filePaths[0] : null;

    if (!projectRootFolderPath) return;

    // services.createProject({ projectRootFolderPath });
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
