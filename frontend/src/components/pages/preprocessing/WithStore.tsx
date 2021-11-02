import React from "react";

import { useAppSelector } from "../../../store/hooks";
import PreProcessPage from "./Page";

const WithStore = () => {
  const handleSelectLogo = () => {
    let shell = window.require("electron").shell;
    shell.openExternal("https://taggr.ai");
  };

  return (
    <PreProcessPage
      current={useAppSelector((s) => s.progress.current)}
      total={useAppSelector((s) => s.progress.total)}
      handleSelectLogo={handleSelectLogo}
    />
  );
};

export default WithStore;
