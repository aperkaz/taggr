import React from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import MainPage from "./Page";
import { setActiveRoute } from "../../../store";
import CONSTANTS from "../../../store/constants";
import { searchImages } from "../../../services";

const withStore = () => {
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    dispatch(setActiveRoute(CONSTANTS.ROUTES.SETTINGS_PAGE));
  };

  const onInputChange = debounce((v) => {
    searchImages(v);
  }, 200);

  return (
    <MainPage
      {...{
        onSettingsClick,
        task: useSelector((s) => s.task),
        images: useSelector((s) => s.images),
        imagesWithLocation: useSelector((s) => s.imagesWithLocation),
      }}
    />
  );
};

export default withStore;
