import React from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import debounce from "lodash.debounce";

import FE_ROUTES from "../../../../shared/fe-routes";
import { MessageType } from "../../../../shared/message-passing";
import { FiltersType } from "../../../../shared/entities";

import { ACTIONS } from "../../../store";
import { useAppSelector } from "../../../store/hooks";
import messageHandler from "../../../message-handler";
import DashboardPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const progress = useAppSelector((s) => s.progress);
  const images = useAppSelector((s) => s.images);
  const imagesWithLocation = useAppSelector((s) => s.imagesWithLocation);

  const onSettingsClick = () => {
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.SETTINGS_PAGE));
  };

  const onSearchTriggered = debounce((filters: FiltersType) => {
    messageHandler.postMessage({
      type: MessageType.BE_FILTER_IMAGES,
      payload: filters,
    });
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
