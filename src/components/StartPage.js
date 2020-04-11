const { dialog } = window.require("electron").remote;

import React from "react";
import { view } from "@risingstack/react-easy-state";
import state from "../store";

const StartPage = view(() => (
  <div className="start-page-wrapper">
    <main className="columns is-mobile is-vcentered is-centered">
      <div className="column has-text-centered">
        <h1 className="title is-1" style={{ marginBottom: "80px" }}>
          Welcome to Privatus!
        </h1>
        <p>
          The next gen AI-powered <b>privacy-focused photo experience</b>
        </p>
        <br />
        <p>
          Rediscover your photos while <b>keeping your privacy</b> 🛡️
        </p>
        <br />
        <br />
        <button
          id="rootFolderButton"
          className="button is-active is-primary is-large"
          onClick={async () => await selectRootFolderPath()}
        >
          Select picture folder
        </button>
      </div>
    </main>
  </div>
));

/**
 * Open dialog to select root folder path
 *
 * @returns {String} rootFolderPath | null
 */
const selectRootFolderPath = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const rootFolderPath = filePaths ? filePaths[0] : null;

  state.rootFolderPath = rootFolderPath;
  //   state.appStatus = "DASHBOARD_PAGE";
};

export default StartPage;
