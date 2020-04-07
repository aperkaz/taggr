const { remote } = require("electron");
const {
  recursivelyFindImages,
  constructImageMap,
  constructImageTags,
} = require("./utils");

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
  imageMap = await selectImageFolderPath();
  renderLoop(imageMap);
};

// UI
const currentImageFolderPath = document.getElementById(
  "currentImageFolderPath"
);
const imagesList = document.getElementById("imagesList");

// Render loop, update UI based on state changes
function renderLoop(imageMap) {
  currentImageFolderPath.innerHTML = rootFolderPath;

  imagesList.innerHTML = null;
  Object.keys(imageMap).forEach((key) => {
    const imagePath = imageMap[key].path;
    const imageTags = imageMap[key].tags;

    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${imagePath} : [${imageTags}]`));
    imagesList.appendChild(li);
  });
}

// Load photo folder path
async function selectImageFolderPath(imageMap) {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (filePaths) {
    rootFolderPath = filePaths[0];
    imagePaths = await recursivelyFindImages(rootFolderPath);
    imageMap = await constructImageMap(imagePaths);
    imageMap = await constructImageTags(imageMap);
  }

  return imageMap;
}
