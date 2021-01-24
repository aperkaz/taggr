import React from "react";

import PreprocessPage from "./Page";

const WithStore = () => {
  const dispatch = useDispatch();

  const onSelectLogo = () => {
    const { shell } = window.require("electron");
    shell.openExternal("https://taggr.ai");
  };

  return <PreprocessPage memoryNumber={'1283'} onSelectLogo={onSelectLogo} />;
};

export default WithStore;
