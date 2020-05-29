import React from "react";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../../store";
import CONSTANTS from "../../../store/constants";
import SettingsPage from "./Page";
import { deleteProject } from "../../../services";

const withStore = () => {
  const dispatch = useDispatch();

  const onSelectReset = () => {
    dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.START_PAGE));
    deleteProject();
  };

  const onSelectSave = () => {
    dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));
  };

  const onSelectSupport = () => {
    const { shell } = require("electron");
    shell.openExternal("https://taggr.ai/support");
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
