onmessage = async (e) => {
  console.log("recursiveImageFinderWorker received task");
  const readdirp = require("readdirp");
  let imagePathsList = [];

  if (!e.data || !e.data.path) return [];
  const folderPath = e.data.path;

  var settings = {
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules"],
  };

  for await (const entry of readdirp(folderPath, settings)) {
    const { path } = entry;
    imagePathsList.push(`file:///${folderPath}/${path}`);
  }

  postMessage({ imagePathsList });
};
