const { remote } = require("electron");
const {
  recursivelyFindImages,
  constructImageMap,
  constructImageTags,
} = require("./utils");

const { loadModel } = require("./imageRecognition");

const { dialog } = remote;

// Global state
let state = {
  rootFolderPath: null,
  imagePathsList: [],
  imageHashMap: {},
};

// Buttons
const selectImageFolderPathBtn = document.getElementById(
  "selectImageFolderBtn"
);

selectImageFolderPathBtn.onclick = async () => {
  state.rootFolderPath = await selectRootFolderPath();

  renderLoop();

  state.imagePathsList = await recursivelyFindImages(state.rootFolderPath);
  console.log(state);
  state.imageHashMap = await constructImageMap(state.imagePathsList);
  console.log(state);
  console.log("///");
  console.log(state.imageHashMap);
  // TODO: blocks the UI. Move to separate task
  state.imageHashMap = await constructImageTags(state.imageHashMap);
  console.log(state);

  renderLoop();
};

// UI
const currentImageFolderPath = document.getElementById(
  "currentImageFolderPath"
);
const imagesList = document.getElementById("imagesList");

// Render loop, update UI based on state changes
function renderLoop() {
  console.time("renderLoop");

  // update title
  currentImageFolderPath.innerHTML = state.rootFolderPath
    ? state.rootFolderPath
    : "";

  imagesList.innerHTML = null;
  Object.keys(state.imageHashMap).forEach((key) => {
    const imagePath = state.imageHashMap[key].path;
    const imageTags = state.imageHashMap[key].tags;

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${imagePath} : [${imageTags}]`));
    imagesList.appendChild(li);
  });

  console.timeEnd("renderLoop");
}

/**
 * Open dialog to select root folder path
 *
 * @returns {String} root folder path | undefined
 */
async function selectRootFolderPath() {
  let rootFolderPath = null;

  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (filePaths) {
    rootFolderPath = filePaths[0];
  }

  return rootFolderPath;
}

// load the required tensorflow.js models
(async () => {
  try {
    await loadModel();
  } catch (err) {
    console.log(err);
  }
})();
