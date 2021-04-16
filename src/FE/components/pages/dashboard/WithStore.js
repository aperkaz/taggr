import React from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import FE_ROUTES from "../../../../shared/fe-routes";

import { ACTIONS } from "../../../store";
import DashboardPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const progress = useSelector((s) => s.progress);
  const images = useSelector((s) => s.images);
  const imagesWithLocation = useSelector((s) => s.imagesWithLocation);

  const onSettingsClick = () => {
    dispatch(ACTIONS.setActiveRoute(FE_ROUTES.SETTINGS_PAGE));
  };

  const onSearchTriggered = debounce((filters) => {
    // services.filterImages(filters);
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
