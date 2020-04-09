const { dialog } = remote;
const { observe } = require("@nx-js/observer-util");
const { Queue, priorities } = require("@nx-js/queue-util");

const { recursivelyFindImages } = require("../utils");

class IntroPage {
  constructor(store) {
    this.store = store;

    // Setup prioritized queue for batching up observable reactions in render
    this.scheduler = new Queue(priorities.LOW);
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

  onClickRootFolderButton = async () => {
    store.rootFolderPath = await this.selectRootFolderPath();
  };

  scheduler = new Queue(priorities.LOW);

  render = observe(
    () => {
      document.getElementById("app").innerHTML = `
      <h1>Welcome to Privatus!</h1>
      <br/>
      <button id="rootFolderButton">Pick root folder</button>
      <br/>
      <p id="currentImageFolderPath">${store.rootFolderPath}</p>
      <ul id="imagesList">
	    </ul>
      `;

      const rootFolderButton = document.getElementById("rootFolderButton");
      rootFolderButton.onclick = this.onClickRootFolderButton;

      const imagesList = document.getElementById("imagesList");
      imagesList.innerHTML = null;
      Object.keys(store.imageHashMap).forEach((key) => {
        const imagePath = store.imageHashMap[key].path;
        const imageTags = store.imageHashMap[key].tags;

        const li = document.createElement("li");
        li.appendChild(
          document.createTextNode(`${imagePath} : [${imageTags}]`)
        );
        imagesList.appendChild(li);
      });
    },
    { scheduler: this.scheduler }
  );
}

module.exports = IntroPage;
