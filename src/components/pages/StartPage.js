const { html } = require("htm/react");

const StartPage = ({ onSelectRootFolderPath }) =>
  html`<div style=${styles.wrapper}>
    <div style=${styles.main}>
      <h1 className="title is-1" style=${{ marginBottom: "80px" }}>
        Welcome to taggr!
      </h1>
      <p>
        Rediscover your memories while keeping your privacy
        <br />
        Powered by Machine-Learning
      </p>
      <button onClick=${async () => await onSelectRootFolderPath()}>
        Select picture folder
      </button>
    </div>
  </div>`;

const styles = {
  wrapper: {
    backgroundColor: "pink",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  main: { margin: "auto" },
};

module.exports = StartPage;
