import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MainPage from "./Page";
import { setActiveRoute, resetState } from "../../../store";
import CONSTANTS from "../../../store/constants";

const withStore = () => {
  const dispatch = useDispatch();

  const onSettingsClick = () => {
    dispatch(setActiveRoute(CONSTANTS.ROUTES.SETTINGS));
  };
  const onInputChange = (v) => {
    console.log("input changed", v);
    // TODONOW: call backend
  };
  const onPressReset = () => {
    console.log("reset pressed");

    dispatch(setActiveRoute(CONSTANTS.ROUTES.START_PAGE));
    dispatch(resetState());

    // TODONOW: clean backend too. IPC message, with  BE action
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
