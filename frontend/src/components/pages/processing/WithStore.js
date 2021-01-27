import React from "react";
import useDispatch from "react-redux";

import ProcessPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectLogo = () => {
    const { shell } = window.require("electron");
    shell.openExternal("https://taggr.ai");
  };

  return <ProcessPage memoryNumber={"1283"} onSelectLogo={onSelectLogo} />;
};

export default WithStore;
