// import envPaths from "./env-paths";

// const VERSION = 0;

// const MIGRATIONS = {
//   0: (db) => db,
// };

// const db = () => {
//   // initialize db
//   makeDir(envPaths.data);
//   const dbPath = path.join(paths.data, "/db.json");

//   const low = require("lowdb");
//   const FileSync = require("lowdb/adapters/FileSync");

//   const adapter = new FileSync(dbPath);
//   const db = low(adapter);

//   // execute migrations if needed
//   //   if(VERSION > Object.keys(MIGRATIONS).sort((a,b) => a-b))

//   return db;
// };

// export default db();
