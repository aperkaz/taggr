// @ts-nocheck
import Store from "electron-store";

import { ImageType } from "../../shared/entities";
import activeEnv, { ENVS } from "../../shared/active-env";

export const PROPERTIES = {
  ALL_IMAGES: "all_images",
  CURRENT_IMAGE_HASES: "current_image_hases",
};

const SHARED = {
  schema: {
    images: {
      type: "object",
      required: ["hash", "path", "rawPath"],
      /**
       * @type {ImageType}
       */
      properties: {
        hash: {
          type: "string",
        },
        path: {
          type: "string",
        },
        rawPath: {
          type: "string",
        },
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
        location: {
          latitude: {
            type: "number",
          },
          longitude: {
            type: "number",
          },
        },
        creationDate: {
          type: "number",
        },
      },
    },
  },
  clearInvalidConfig: true,
};

const DEV_CONFIG = {
  ...SHARED,
  cwd: "/Users/alain/Downloads/output",
};

const PROD_CONFIG = {
  ...SHARED,
  encryptionKey: 1234,
};

const db = new Store(activeEnv === ENVS.BUILD_PROD ? PROD_CONFIG : DEV_CONFIG);

export default db;
