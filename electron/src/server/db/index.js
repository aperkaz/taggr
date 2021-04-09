const envPaths = require("env-paths");
const paths = envPaths("taggr");
const makeDir = require("make-dir");
const path = require("path");

/**
 * DB Module
 */
const initialize = () => {
  console.log("Initialize DB!");
  // create DB folder if needed, can use await
  makeDir(paths.data);

  // initialize db
  const dbPath = path.join(paths.data, "/db.json");

  const low = require("lowdb");
  const FileSync = require("lowdb/adapters/FileSync");

  const adapter = new FileSync(dbPath);
  const db = low(adapter);
  db.defaults({ images: {}, version: 1 }).write();
  db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();

  // TODONOW: add migration. Add DB version coun in DB, if changed, perform operation https://github.com/sindresorhus/electron-store#migrations

  // TODONOW: add DB accessors and data savers

  const saveImage = (image) => db.set(`images.${image.hash}`, image).write();

  return {
    // db,
    saveImage,
  };
};

module.exports = initialize();
