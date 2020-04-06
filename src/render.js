const { remote } = require("electron");

const { recursivelyFindPictures, constructPictureMap } = require("./utils");

const { dialog } = remote;

// Global state
let rootFolderPath = "";
let picturePaths = [];
let pictureMap = {};

// Buttons
const selectPictureFolderPathBtn = document.getElementById(
  "selectPictureFolderBtn"
);

selectPictureFolderPathBtn.onclick = async () => {
  await selectPictureFolderPath();
  renderLoop();
};

// UI
const currentPictureFolderPath = document.getElementById(
  "currentPictureFolderPath"
);
const picturesList = document.getElementById("picturesList");

// Render loop, update UI based on state changes
function renderLoop() {
  currentPictureFolderPath.innerHTML = rootFolderPath;

  picturesList.innerHTML = null;
  picturePaths.map((picture) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(picture));
    picturesList.appendChild(li);
  });
}

// Load photo folder path
async function selectPictureFolderPath() {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (filePaths) {
    rootFolderPath = filePaths[0];
    picturePaths = await recursivelyFindPictures(rootFolderPath);
    pictureMap = await constructPictureMap(picturePaths);
  }
}
