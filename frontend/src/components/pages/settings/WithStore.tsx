import React from "react";
import { useDispatch } from "react-redux";

import { ACTIONS } from "../../../store";
import { sendToBackend } from "../../../message-bus";
import SettingsPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onBrowseMore = () => {
    dispatch(ACTIONS.resetState());
    sendToBackend({ type: "backend_reset" });
  };

  const onSelectDestroy = async () => {
    dispatch(ACTIONS.resetState());
    sendToBackend({ type: "backend_destroy" });
  };

  const onSelectBack = () => {
    dispatch(ACTIONS.setActiveRoute("DASHBOARD_PAGE"));
  };

  const handleOpenLink = (link: string) => () => {
    let shell = window.require("electron").shell;
    shell.openExternal(link);
  };

  const handleSelectFollow = () => {
    let shell = window.require("electron").shell;
    shell.openExternal("https://twitter.com/aperkaz?ref_src=twsrc%5Etfw");
  };

  return (
    <SettingsPage
      onBrowseMore={onBrowseMore}
      onSelectDestroy={onSelectDestroy}
      onSelectBack={onSelectBack}
      onOpenLink={handleOpenLink("https://taggr.ai")}
      onSelectFollow={handleSelectFollow}
    />
  );
};

export default WithStore;
