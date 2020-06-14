import React from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import MainPage from "./Page";
import { ACTIONS } from "../../../store";
import CONSTANTS from "../../../store/constants";
import { serviceFilterImages } from "../../../services";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    dispatch(ACTIONS.setActiveRoute(CONSTANTS.ROUTES.SETTINGS_PAGE));
  };

  const onSearchTriggered = debounce((filters) => {
    serviceFilterImages(filters);
  }, 200);

  return (
    <MainPage
      {...{
        onSettingsClick,
        task: useSelector((s) => s.task),
        onSearchTriggered,
        images: useSelector((s) => s.images),
        imagesWithLocation: useSelector((s) => s.imagesWithLocation),
      }}
    />
  );
};

export default WithStore;
