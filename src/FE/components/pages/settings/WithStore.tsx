import React from "react";
import { useDispatch } from "react-redux";

import FE_ROUTES from "../../../../shared/fe-routes";
import { MessageType } from "../../../../shared/message-passing";

import { ACTIONS } from "../../../store";
import messageHandler from "../../../message-handler";
import SettingsPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onBrowseMore = () => {
    dispatch(ACTIONS.resetState());
    messageHandler.postMessage({ type: MessageType.BE_RESET });
  };

  const onSelectDestroy = async () => {
    dispatch(ACTIONS.resetState());
    messageHandler.postMessage({ type: MessageType.BE_DESTROY });
  };

  const onSelectBack = () => {
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.DASHBOARD_PAGE));
  };

  const onOpenLink = () => {
    let shell = window.require("electron").shell;
    shell.openExternal("https://taggr.ai");
  };

  // const onBrowseMore = () => console.log("NewImport");
  // const onSelectReset = () => console.log("reset");
  // const onSelectBack = () => console.log("back");
  // const onOpenLink = () => console.log("open link");

  return (
    <SettingsPage
      onBrowseMore={onBrowseMore}
      onSelectDestroy={onSelectDestroy}
      onSelectBack={onSelectBack}
      onOpenLink={onOpenLink}
    />
  );
};

export default WithStore;
