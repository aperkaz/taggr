const { dialog } = remote;
const { observe } = require("@nx-js/observer-util");
const { Queue, priorities } = require("@nx-js/queue-util");

class StartPage {
  constructor(store) {
    this.store = store;

    // Setup prioritized queue for batching up observable reactions in render
    this.scheduler = new Queue(priorities.LOW);
  }

  mount() {
    console.log("mount startPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];

    var startPageElement = document.createElement("div");
    startPageElement.setAttribute("id", "start-page");

    bodyElement.appendChild(startPageElement);

    this.render();
  }

  unmount() {
    console.log("unmount startPage");
    let bodyElement = document.getElementsByTagName("BODY")[0];
    const startPageElement = document.getElementById("start-page");

    if (startPageElement) bodyElement.removeChild(startPageElement);
  }

  /**
   * Open dialog to select root folder path
   *
   * @returns {String} root folder path | undefined
   */
  selectRootFolderPath = async () => {
    let rootFolderPath = null;

    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (filePaths) {
      rootFolderPath = filePaths[0];
    }

    return rootFolderPath;
  };

  render = observe(
    () => {
      if (!document.getElementById("start-page")) return;

      // online mock: https://codepen.io/aperkaz/pen/JjYjWwm
      document.getElementById("start-page").innerHTML = `
      <div class="start-page-wrapper">
        <main class="columns is-mobile is-vcentered is-centered">
          <div class="column has-text-centered">
            <h1 class="title is-1" style="margin-bottom: 80px">
              Welcome to Privatus!
            </h1>
            <p>The next gen AI-powered <b>privacy-focused photo experience</b></p>
            <br/>
            <p>Rediscover your photos while <b>keeping your privacy</b> 🛡️</p>
            <br/>
            <br/>
            <button id="rootFolderButton" class="button is-active is-primary is-large">Select picture folder</button>
          </div>
        </main>
      </div>
      `;

      const rootFolderButton = document.getElementById("rootFolderButton");
      rootFolderButton.onclick = async () => {
        store.rootFolderPath = await this.selectRootFolderPath();
      };
    },
    { scheduler: this.scheduler }
  );
}

module.exports = StartPage;
