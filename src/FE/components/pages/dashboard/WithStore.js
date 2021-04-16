import React from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import FE_ROUTES from "../../../../shared/fe-routes";

import { ACTIONS } from "../../../store";
import DashboardPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

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
        task: useSelector((s) => s.task),
        onSearchTriggered,
        images: useSelector((s) => s.images),
        // images: [],
        imagesWithLocation: useSelector((s) => s.imagesWithLocation),
      }}
    />
  );
};

export default WithStore;
