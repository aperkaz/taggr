import React from "react";
import { useDispatch } from "react-redux";
import throttle from "lodash.throttle";

import FE_ROUTES from "../../../../shared/fe-routes";
import { MessageType } from "../../../../shared/message-passing";
import logger from "../../../../shared/logger";

import { ACTIONS } from "../../../store";
import { useAppSelector } from "../../../store/hooks";
import messageHandler from "../../../message-handler";
import SettingsPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();
  const isSupporter = useAppSelector((s) => s.isSupporter);

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

  const handleOpenLink = (link: string) => () => {
    let shell = window.require("electron").shell;
    shell.openExternal(link);
  };

  const handleSelectSupport = () => {
    let shell = window.require("electron").shell;
    shell.openExternal("https://taggr.ai/#support");
  };

  const handleCheckIfSupporter = throttle(async (email: string) => {
    messageHandler.postMessage({
      type: MessageType.BE_CHECK_IS_SUPPORTER,
      payload: email,
    });
  }, 5000);

  return (
    <SettingsPage
      isSupporter={isSupporter}
      onBrowseMore={onBrowseMore}
      onSelectDestroy={onSelectDestroy}
      onSelectBack={onSelectBack}
      onOpenLink={handleOpenLink("https://taggr.ai")}
      onSelectSupport={handleSelectSupport}
      onCheckIfSupporter={handleCheckIfSupporter}
    />
  );
};

export default WithStore;
