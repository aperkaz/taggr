import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MainPage from "./Page";
import { setActiveRoute } from "../../../store";
import CONSTANTS from "../../../store/constants";

const withStore = () => {
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    dispatch(setActiveRoute(CONSTANTS.ROUTES.SETTINGS));
  };
  const onInputChange = (v) => {
    console.log("input changed", v);
  };
  const onPressReset = () => {
    console.log("reset pressed");
  };

  return (
    <MainPage
      {...{
        onSettingsClick,
        onInputChange,
        onPressReset,
        tags: useSelector((s) => s.tags),
        images: useSelector((s) => s.images),
      }}
    />
  );
};

export default withStore;
