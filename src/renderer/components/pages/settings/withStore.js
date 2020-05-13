import React from "react";
import { useDispatch } from "react-redux";
import { setActiveRoute, serviceDeleteProject } from "../../../store";
import CONSTANTS from "../../../store/constants";
import SettingsPage from "./Page";

const withStore = () => {
  const dispatch = useDispatch();

  const onSelectReset = () => {
    // TODONOW: add stop signal to ongoing flows!!!!!
    dispatch(setActiveRoute(CONSTANTS.ROUTES.START_PAGE));
    serviceDeleteProject();
  };

  const onSelectSave = () => {
    dispatch(setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));
  };

  const onSelectSupport = () => {
    const { shell } = require("electron");
    shell.openExternal("https://taggr.ai/support.html");
  };

  return (
    <SettingsPage
      onSelectReset={onSelectReset}
      onSelectSave={onSelectSave}
      onSelectSupport={onSelectSupport}
    />
  );
};

export default withStore;
