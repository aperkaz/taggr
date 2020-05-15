import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MainPage from "./Page";
import { setActiveRoute, serviceSearchImages } from "../../../store";
import CONSTANTS from "../../../store/constants";
import debounce from "lodash.debounce";

const withStore = () => {
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    dispatch(setActiveRoute(CONSTANTS.ROUTES.SETTINGS_PAGE));
  };

  const onInputChange = debounce((v) => {
    serviceSearchImages(v);
  }, 200);

  return (
    <MainPage
      {...{
        onSettingsClick,
        onInputChange,
        task: useSelector((s) => s.task),
        tags: useSelector((s) => s.tags),
        images: useSelector((s) => s.images),
        imagesWithLocation: useSelector((s) => s.imagesWithLocation),
      }}
    />
  );
};

export default withStore;
