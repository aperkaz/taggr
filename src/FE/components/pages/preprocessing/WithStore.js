import React from "react";
import { useSelector } from "react-redux";

import PreProcessPage from "./Page";

const WithStore = () => {
  const handleSelectLogo = () => {
    let shell = window.require("electron").shell;
    shell.openExternal("https://taggr.ai");
  };

  return (
    <PreProcessPage
      total={useSelector((s) => s.progress.total)}
      handleSelectLogo={handleSelectLogo}
    />
  );
};

export default WithStore;
