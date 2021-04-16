import React from "react";
import { useDispatch } from "react-redux";

import FE_ROUTES from "../../../../shared/fe-routes";
import { MESSAGE_CREATORS } from "../../../../shared/message-passing";

import { ACTIONS } from "../../../store";
import messageHandler from "../../../message-handler";
import SettingsPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectReset = () => {
    dispatch(ACTIONS.resetState());

    messageHandler.postMessage(MESSAGE_CREATORS.BE_reset());
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
