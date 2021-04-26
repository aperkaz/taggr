/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import FE_ROUTES from "../../../../shared/fe-routes";

import { ACTIONS } from "../../../store";
import DashboardPage from "./Page";
import messageHandler from "../../../message-handler";
import { MESSAGE_CREATORS } from "../../../../shared/message-passing";

const WithStore = () => {
  const dispatch = useDispatch();

  const progress = useSelector((s) => s.progress);
  const images = useSelector((s) => s.images);
  const imagesWithLocation = useSelector((s) => s.imagesWithLocation);

  const onSettingsClick = () => {
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.SETTINGS_PAGE));
  };

  const onSearchTriggered = debounce((filters) => {
    messageHandler.postMessage(MESSAGE_CREATORS.BE_filterImages(filters));
  }, 200);

  return (
    <DashboardPage
      {...{
        onSettingsClick,
        isProcessing: progress.current < progress.total,
        progress,
        onSearchTriggered,
        images,
        // images: [],
        imagesWithLocation,
      }}
    />
  );
};

export default WithStore;
