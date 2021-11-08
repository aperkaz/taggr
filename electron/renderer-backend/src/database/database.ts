import Store from "electron-store";

import { types } from "taggr-shared";

type SharedConfigType = {
	clearInvalidConfig: boolean;
	defaults: { allImages: types.ImageHashMap; currentImageHashes: string[] };
};

const SHARED_CONFIG: SharedConfigType = {
	clearInvalidConfig: true,
	defaults: {
		allImages: {} as types.ImageHashMap,
		currentImageHashes: [] as string[],
	},
};

const DEV_CONFIG = {
	...SHARED_CONFIG,
	cwd: "/Users/alain/Downloads/output",
};

const PROD_CONFIG = {
	...SHARED_CONFIG,
	encryptionKey: "1234", // adds encryption in prod db
};

/**
 * Configures, creates and returns instance of https://github.com/sindresorhus/electron-store
 */
const dbFactory = (isDev: boolean) => {
	const db = new Store(isDev ? DEV_CONFIG : PROD_CONFIG);

	return db;
};

export default dbFactory;
