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

  const onFilterChange = debounce((rawFilter) => {
    // send to backend only enabled filters, ex. {dog: true}
    let filter = Object.keys(rawFilter).filter((k) => rawFilter[k]);
    serviceFilterImages({ filter });
  }, 200);

  return (
    <MainPage
      {...{
        onSettingsClick,
        task: useSelector((s) => s.task),
        onFilterChange,
        images: useSelector((s) => s.images),
        imagesWithLocation: useSelector((s) => s.imagesWithLocation),
      }}
    />
  );
};

export default WithStore;
