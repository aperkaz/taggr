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
    // TODONOW:
  };
  const onPressReset = () => {
    console.log("reset pressed");

    dispatch(setActiveRoute(CONSTANTS.ROUTES.START_PAGE));
    // TODONOW: clean up store, call backend. The backend should trigger the actions to clean up
  };

  return (
    <MainPage
      {...{
        onSettingsClick,
        onInputChange,
        onPressReset,
        task: useSelector((s) => s.task),
        tags: useSelector((s) => s.tags),
        images: useSelector((s) => s.images),
      }}
    />
  );
};

export default withStore;
