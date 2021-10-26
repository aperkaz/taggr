import React from "react";
import shared from "taggr-shared";
import logo from "./logo.svg";

function App() {
  return (
    <div>
      <header>
        <img src={logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          TS here!! {shared}
        </a>
      </header>
    </div>
  );
}

export default App;
