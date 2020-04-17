const { html } = require("htm/react");

const StartPage = ({ onSelectRootFolderPath }) =>
  html`<div style=${styles.wrapper}>
    <div style=${styles.main}>
      <h1 className="title is-1" style=${{ marginBottom: "80px" }}>
        Welcome to Privatus!
      </h1>
      <p>
        The next gen AI-powered <b>privacy-focused photo experience</b>
        <br />
        Rediscover your photos while <b>keeping your privacy</b> 🛡️
      </p>
      <button onClick=${async () => await onSelectRootFolderPath()}>
        Select picture folder
      </button>
    </div>
  </div>`;

const styles = {
  wrapper: {
    backgroundColor: "pink",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  main: { margin: "auto" },
};

module.exports = StartPage;
