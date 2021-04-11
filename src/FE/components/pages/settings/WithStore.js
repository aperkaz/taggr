import React from "react";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../../store";
import CONSTANTS from "../../../store/constants";
import SettingsPage from "./Page";
// import * as services from "../../../services";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectReset = () => {
    // services.deleteProject();

    dispatch(ACTIONS.resetState());
    dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.START_PAGE));
  };

  const onSelectSave = () => {
    dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.DASHBOARD_PAGE));
  };

  const onOpenLink = (href) => {
    const { shell } = window.require("electron").remote;
    shell.openExternal(href);
  };

  return (
    <SettingsPage
      onSelectReset={onSelectReset}
      onSelectSave={onSelectSave}
      onOpenLink={onOpenLink}
    />
  );
};

export default WithStore;
