const { remote } = require("electron");
const { recursivelyFindImages, constructImageMap } = require("./utils");

const { dialog } = remote;

// Global state
let rootFolderPath = "";
let imagePaths = [];
let imageMap = {};

// Buttons
const selectImageFolderPathBtn = document.getElementById(
  "selectImageFolderBtn"
);

selectImageFolderPathBtn.onclick = async () => {
  await selectImageFolderPath();
  renderLoop();
};

// UI
const currentImageFolderPath = document.getElementById(
  "currentImageFolderPath"
);
const imagesList = document.getElementById("imagesList");

// Render loop, update UI based on state changes
function renderLoop() {
  currentImageFolderPath.innerHTML = rootFolderPath;

  imagesList.innerHTML = null;
  imagePaths.map((image) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(image));
    imagesList.appendChild(li);
  });
}

// Load photo folder path
async function selectImageFolderPath() {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (filePaths) {
    rootFolderPath = filePaths[0];
    imagePaths = await recursivelyFindImages(rootFolderPath);
    imageMap = await constructImageMap(imagePaths);
  }
}
