const { dialog } = remote;

class StartPage {
  constructor(store) {
    this.store = store;
  }

  mount() {
    console.log("mount startPage");

    // create hook-div if not pressent in page
    if (!document.getElementById("start-page")) {
      let bodyElement = document.getElementsByTagName("BODY")[0];

      let startPageElement = document.createElement("div");
      startPageElement.setAttribute("id", "start-page");

      bodyElement.appendChild(startPageElement);
    }

    // add static html inside hook-div
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

    // add listeners
    const rootFolderButton = document.getElementById("rootFolderButton");
    rootFolderButton.onclick = async () => {
      store.rootFolderPath = await this.selectRootFolderPath();
    };
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
   * @returns {String} rootFolderPath | null
   */
  async selectRootFolderPath() {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    return filePaths ? filePaths[0] : null;
  }
}

module.exports = StartPage;
