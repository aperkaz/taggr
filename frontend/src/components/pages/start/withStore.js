import React from "react";
import { useDispatch } from "react-redux";

import { ACTIONS } from "../../../store";
// import { createProject } from "../../../services";
import { send } from "../../../services";

import CONSTANTS from "../../../store/constants";
import StartPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectRootFolderPath = async () => {
    let result = await send("make-factorial", { num: 5 });
    console.log(result);

    return;
    // const { dialog } = window.require("electron").remote;

    // const { filePaths } = await dialog.showOpenDialog({
    //   properties: ["openDirectory"],
    // });

    // const projectRootFolderPath = filePaths ? filePaths[0] : null;

    // if (!projectRootFolderPath) return;

    // dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));
    // createProject(projectRootFolderPath);
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
