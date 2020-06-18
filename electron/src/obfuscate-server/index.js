const bytenode = require("bytenode");
const path = require("path");
const fs = require("fs");
const readdirp = require("readdirp");

const SERVER_PATH = path.resolve(__dirname, "../server");

const recursivelyFindSourceFiles = async (path) => {
  let sourceFilesPaths = [];

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.js"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(path, settings)) {
    const { path } = entry;

    sourceFilesPaths.push(`${SERVER_PATH}/${path}`);
  }

  return sourceFilesPaths;
};

const recursivelyFindCompiledFiles = async (path) => {
  let compiledFiles = [];

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.jsc"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(path, settings)) {
    const { path } = entry;

    compiledFiles.push(`${SERVER_PATH}/${path}`);
  }

  return compiledFiles;
};

const compileAllJsToJscInFolder = (sourcePath, sourceFiles) => {
  sourceFiles.forEach((sourceFile) => {
    console.log("sourceFile: ", sourceFile);

    let relativeFolder = sourceFile.split("/");
    const originalFilename = relativeFolder.pop();
    relativeFolder = relativeFolder.join("/");
    console.log("relativeFolder: ", relativeFolder);

    console.log("originalFilename: ", originalFilename);

    const fileName = originalFilename.split(".js").shift();
    console.log("filename: ", fileName);

    const originFilePath = `${sourceFile}`;
    console.log("org: ", originFilePath);
    const destinationFilePath = `${
      relativeFolder ? `${relativeFolder}/` : ""
    }${fileName}.jsc`;
    console.log("dest: ", destinationFilePath);

    bytenode.compileFile(originFilePath, destinationFilePath);

    console.log("===");
  });
};

const removeFiles = (files) => {
  const fs = require("fs");

  files.forEach((file) => {
    fs.unlinkSync(file);
  });
};

(async () => {
  "use strict";

  const v8 = require("v8");

  v8.setFlagsFromString("--no-lazy");

  // 1. find all src.js files
  const sourceFiles = await recursivelyFindSourceFiles(SERVER_PATH);

  // 2. convert them all to jsc in folders
  // compileAllJsToJscInFolder(SERVER_PATH, sourceFiles);

  // 3. remove original files
  // console.log(await recursivelyFindSourceFiles(SERVER_PATH));
  // removeFiles(await recursivelyFindSourceFiles(SERVER_PATH));

  // 4. remove compiles files
  // console.log(await recursivelyFindCompiledFiles(SERVER_PATH));
  // removeFiles(await recursivelyFindCompiledFiles(SERVER_PATH));
})();

// require("./src/main-window.src.jsc");
// require("./main-window.src.js");
