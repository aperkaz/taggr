import React from "react";
import { view } from "@risingstack/react-easy-state";

const StartPage = view(({ onSelectRootFolderPath }) => (
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
          onClick={async () => await onSelectRootFolderPath()}
        >
          Select picture folder
        </button>
      </div>
    </main>
  </div>
));

export default StartPage;
