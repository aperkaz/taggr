import readdirp from "readdirp";

self.onmessage = async (e) => {
  let imagePathsList = [];
  console.log("recursiveImageFinderWorker received task");

  if (!e.data || !e.data.path) return [];
  const folderPath = e.data.path;

  var settings = {
    root: folderPath,
    // Filter files with js and json extension
    fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", ".*.jpeg", "*.JPEG"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules"],
  };
  readdirp(settings)
    .on("data", (entry) => {
      const { path } = entry;

      /* Issue loading local files, fixed with https://github.com/legend80s/gallery-electron */
      imagePathsList.push(`file:///${folderPath}/${path}`);
    })
    .on("error", (error) => console.error("fatal error", error))
    .on("end", () => self.postMessage({ imagePathsList }));

  return;
};
