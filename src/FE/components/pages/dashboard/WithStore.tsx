import React from "react";
// @ts-ignore
import debounce from "lodash.debounce";

import FE_ROUTES from "../../../../shared/fe-routes";
import { MessageType } from "../../../../shared/message-passing";
import { FiltersType } from "../../../../shared/entities";

import { ACTIONS } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import messageHandler from "../../../message-handler";
import DashboardPage from "./Page";

const WithStore = () => {
  const dispatch = useAppDispatch();

  const progress = useAppSelector((s) => s.progress);
  const isProcessing = useAppSelector((s) => s.isProcessing);

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
      isProcessing={isProcessing}
      progress={progress}
      images={images}
      imagesWithLocation={imagesWithLocation}
      onSettingsClick={onSettingsClick}
      onSearchTriggered={onSearchTriggered}
    />
  );
};

export default WithStore;
