import React from "react";
import debounce from "lodash.debounce";

import { ACTIONS } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { sendToBackend } from "../../../message-bus";
import DashboardPage from "./Page";
import { types } from "taggr-shared";

const WithStore = () => {
  const dispatch = useAppDispatch();

  const images = useAppSelector((s) => s.images);
  const imagesWithLocation = useAppSelector((s) => s.imagesWithLocation);

  const onSettingsClick = () => {
    dispatch(ACTIONS.setActiveRoute("SETTINGS_PAGE"));
  };

  const onSearchTriggered = debounce((filters: types.Filters) => {
    sendToBackend({
      type: "backend_filter-images",
      payload: filters,
    });
  }, 200);

  return (
    <DashboardPage
      images={images}
      imagesWithLocation={imagesWithLocation}
      onSettingsClick={onSettingsClick}
      onSearchTriggered={onSearchTriggered}
    />
  );
};

export default WithStore;
