import React from "react";
import { sendToBackend } from "./message-bus";
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
          TS here!!
        </a>
        <button
          onClick={() => {
            sendToBackend({
              type: "backend-notify",
              payload: "Hello from the FE",
            });
          }}
        >
          CALL THE BACKEND
        </button>
      </header>
    </div>
  );
}

export default App;
