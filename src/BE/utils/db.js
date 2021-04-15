import Store from "electron-store";

// TODONOW: add schema
// TODONOW: add migrations
// const schema = {
//   images: {
//     type: "object",
//     /**
//      * @type {import("../../shared/entities").ImageType}
//      */
//     properties: {
//         hash: {
//             type: 'string',
//         }
//         path
//         rawPath
//         tags
//         location
//         creationDate:
//     },
//   },
// };
const db = () => {
  // TODONOW: remove cwd, only in dev
  const store = new Store({ cwd: "/Users/alain/Downloads/output" });

  return store;
};

export default db();
