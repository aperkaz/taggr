import React from "react";
import { useDispatch } from "react-redux";

import FE_ROUTES from "../../../../shared/fe-routes";

import { ACTIONS } from "../../../store";
import SettingsPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectReset = () => {
    // services.deleteProject();

    dispatch(ACTIONS.resetState());
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.START_PAGE));
  };

  const onSelectSave = () => {
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.DASHBOARD_PAGE));
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
