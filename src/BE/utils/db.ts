import Store from "electron-store";

import { ImageType } from "../../shared/entities";
import activeEnv, { ENVS } from "../../shared/active-env";

export const PROPERTIES = {
  ALL_IMAGES: "ALL_IMAGES",
  CURRENT_IMAGE_HASHES: "CURRENT_IMAGE_HASHES",
  IS_SUPPORTER: "IS_SUPPORTER",
};

type SharedConfigType = {
  clearInvalidConfig: boolean;
  defaults: { [key in keyof typeof PROPERTIES]: any };
};

const SHARED_CONFIG: SharedConfigType = {
  clearInvalidConfig: true,
  defaults: {
    ALL_IMAGES: [] as ImageType[],
    CURRENT_IMAGE_HASHES: [] as string[],
    IS_SUPPORTER: false,
  },
};

const DEV_CONFIG = {
  ...SHARED_CONFIG,
  cwd: "/Users/alain/Downloads/output",
};

const PROD_CONFIG = {
  ...SHARED_CONFIG,
  encryptionKey: "1234",
};

const db = new Store(activeEnv === ENVS.BUILD_PROD ? PROD_CONFIG : DEV_CONFIG);

export default db;
