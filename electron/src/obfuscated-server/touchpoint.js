"use strict";

const bytenode = require("bytenode");
const fs = require("fs");
const v8 = require("v8");
const path = require("path");

v8.setFlagsFromString("--no-lazy");

if (!fs.existsSync("./index.jsc")) {
  console.log("about to compile");

  console.log(__dirname);
  // bytenode.compileFile(`${__dirname}/index.js`, `${__dirname}/index.jsc`);
  bytenode.compileFile(
    path.resolve(__dirname, `../../server/index.js`),
    path.resolve(__dirname, `index.jsc`)
  );

  bytenode.compileFile(
    path.resolve(__dirname, `../../server/env.js`),
    path.resolve(__dirname, `env.jsc`)
  );

  bytenode.compileFile(
    path.resolve(__dirname, `../../server/analytics/*.js`),
    path.resolve(__dirname)
  );
}

console.log("touchpoint hit");

// require("./index.jsc");
