import Store from "electron-store";

export const PROPERTIES = {
  ALL_IMAGES: "all_images",
  CURRENT_IMAGE_HASES: "current_image_hases",
};

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
// TODONOW: remove cwd, use only in dev
const db = new Store({ cwd: "/Users/alain/Downloads/output" });

export default db;
