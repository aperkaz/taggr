// import React from "react";
// import { useDispatch } from "react-redux";

// import StartPage from "./Page";
// import { serviceCreateProject } from "../../../services";
// import { ACTIONS } from "../../../store";
// import CONSTANTS from "../../../store/constants";

// const WithStore = () => {
//   const dispatch = useDispatch();

//   const onSelectRootFolderPath = async () => {
//     const { dialog } = window.require("electron").remote;

//     const { filePaths } = await dialog.showOpenDialog({
//       properties: ["openDirectory"],
//     });

//     const projectRootFolderPath = filePaths ? filePaths[0] : null;

//     if (!projectRootFolderPath) return;

//     dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));

//     serviceCreateProject({ projectRootFolderPath });
//   };

//   const onSelectLogo = () => {
//     const { shell } = window.require("electron");
//     shell.openExternal("https://taggr.ai");
//   };

//   return (
//     <StartPage
//       onSelectRootFolderPath={onSelectRootFolderPath}
//       onSelectLogo={onSelectLogo}
//     />
//   );
// };

export default WithStore;
// TODONOW: connect
