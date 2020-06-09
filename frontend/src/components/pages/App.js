import React from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-logo">logo</div>
        <p>My react app</p>
        <button
          onClick={async () => {
            // access electron stuff from react
            const { dialog } = window.require("electron").remote;
            console.log(dialog);

            const { filePaths } = await dialog.showOpenDialog({
              properties: ["openDirectory"],
            });
          }}
        >
          open folder
        </button>
        <button
          onClick={async () => {
            fetch("http://localhost:9001")
              .then((res) => res.json())
              .then((data) => console.log(data));
          }}
        >
          ping backend
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
