import React from "react";
import { useDispatch } from "react-redux";

import { setActiveRoute, serviceCreateProject } from "../../../store";
import CONSTANTS from "../../../store/constants";
import StartPage from "./Page";

const withStore = () => {
  const dispatch = useDispatch();

  const onSelectRootFolderPath = async () => {
    const { dialog } = require("electron").remote;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    const projectRootFolderPath = filePaths ? filePaths[0] : null;

    if (!projectRootFolderPath) return;

    dispatch(setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));
    serviceCreateProject(projectRootFolderPath);
  };

  const onSelectLogo = () => {
    const { shell } = require("electron");
    shell.openExternal("https://taggr.ai");
  };

  return (
    <StartPage
      onSelectRootFolderPath={onSelectRootFolderPath}
      onSelectLogo={onSelectLogo}
    />
  );
};

export default withStore;
