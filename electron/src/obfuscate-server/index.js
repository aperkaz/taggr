const bytenode = require("bytenode");

const recursivelyFindSourceFiles = async (path) => {
  const readdirp = require("readdirp");

  let sourceFilesPaths = [];

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.js"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(path, settings)) {
    const { path } = entry;

    sourceFilesPaths.push(path);
  }

  return sourceFilesPaths;
};

const recursivelyFindCompiledFiles = async (path) => {
  const readdirp = require("readdirp");

  let compiledFiles = [];

  var settings = {
    // Filter files with png and jpeg extension
    fileFilter: ["*.jsc"],
    // Filter by directory
    directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
  };

  for await (const entry of readdirp(path, settings)) {
    const { path } = entry;

    compiledFiles.push(path);
  }

  return compiledFiles;
};

const compileAllJsToJscInFolder = (sourceFiles) => {
  sourceFiles.forEach((sourceFile) => {
    console.log("sourceFile: ", sourceFile);

    let relativeFolder = sourceFile.split("/");
    const originalFilename = relativeFolder.pop();
    relativeFolder = relativeFolder.join("/");
    console.log("relativeFolder: ", relativeFolder);

    console.log("originalFilename: ", originalFilename);

    const fileName = originalFilename.split(".js").shift();
    console.log("filename: ", fileName);

    const originFilePath = `${__dirname}/${sourceFile}`;
    console.log("org: ", originFilePath);
    const destinationFilePath = `${__dirname}/${relativeFolder}/${fileName}.jsc`;
    console.log("dest: ", destinationFilePath);

    bytenode.compileFile(originFilePath, destinationFilePath);

    console.log("===");
  });
};

const removeFiles = (files) => {
  const fs = require("fs");

  files.forEach((sourceFile) => {
    fs.unlinkSync(sourceFile);
  });
};

(async () => {
  "use strict";

  const fs = require("fs");
  const v8 = require("v8");
  const path = require("path");

  v8.setFlagsFromString("--no-lazy");

  const OUTPUT_PATH = __dirname;

  // 1. find all src.js files
  const sourceFiles = await recursivelyFindSourceFiles(__dirname);

  // 2. convert them all to jsc in folders
  //   compileAllJsToJscInFolder(sourceFiles);

  // 3. remove original files
  //   removeFiles(await recursivelyFindSourceFiles(__dirname));

  // 4. remove compiles files
  // removeFiles(await recursivelyFindCompiledFiles(__dirname));
})();

// require("./src/main-window.src.jsc");
// require("./main-window.src.js");