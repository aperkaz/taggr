import React from "react";

import PreProcessPage from "./Page";

const WithStore = () => {
  const onSelectLogo = () => {
    const { shell } = window.require("electron");
    shell.openExternal("https://taggr.ai");
  };

  return <PreProcessPage memoryNumber={"1283"} onSelectLogo={onSelectLogo} />;
};

export default WithStore;
