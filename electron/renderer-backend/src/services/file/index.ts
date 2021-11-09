import readdirp from "readdirp";
import { promisify } from "util";
import crypto from "crypto";
import fs from "fs";
import envPaths from "env-paths";
import normalize from "normalize-path";
import ExifImage from "exif";
import { types } from "taggr-shared";

const openFile = promisify(fs.open);
const readFile = promisify(fs.read);
const closeFile = promisify(fs.close);

class FileService {
	/**
	 * Checks if a given file exists
	 */
	doesFileExist(filePath: string) {
		return fs.existsSync(filePath);
	}

	/**
	 * Recursively find all the image paths inside the folderPath
	 */
	async recursivelyFindImages(folderPath: string): Promise<string[]> {
		let imagePathsList = [];

		const settings = {
			// Filter files with png and jpeg extension
			fileFilter: ["*.png", "*.PNG", "*.jpg", "*.JPG", "*.jpeg", "*.JPEG"],
			// Filter by directory
			directoryFilter: ["!.git", "!*modules", "!.cache", "!.*"],
			alwaysStat: true,
		};

		try {
			for await (const entry of readdirp(folderPath, settings)) {
				const { path } = entry;

				imagePathsList.push(`${folderPath}/${path}`);
			}
		} catch (e) {
			console.error(e);
		}

		return imagePathsList;
	}

	/**
	 * Generate md5 hash from file. Use the initial 4k only.
	 */
	async generateFileHash(filePath: string): Promise<string> {
		const len = 4096,
			pos = 0,
			offset = 0,
			buff = Buffer.alloc(len);

		const fd = await openFile(filePath, "r");
		const tempBuff = await readFile(fd, buff, offset, len, pos);
		const hash = crypto.createHash("md5").update(tempBuff.buffer).digest("hex");
		await closeFile(fd);

		return hash;
	}

	/**
	 * Normalize a file path. Adds `file://` prefix to local images.
	 * Fixes the linux / windows compatibility issues.
	 */
	normalizePath(filePath: string): string {
		let normalizedImagePath;

		try {
			normalizedImagePath = normalize(filePath);
			return normalizedImagePath.startsWith("http")
				? normalizedImagePath
				: `file://${normalizedImagePath}`;
		} catch (e) {
			console.error(e);
			return "";
		}
	}

	/**
	 * Load EXIF data from path.
	 */
	loadEXIFData(filePath: string): Promise<types.ExifData | undefined> {
		return new Promise((resolve) => {
			ExifImage(filePath, (err: any, data: any) => resolve(data));
		});
	}

	/**
	 * Returns the app directory depending on the OS.
	 * https://github.com/sindresorhus/env-paths
	 */
	getDataDirectory(): string {
		return envPaths("taggr").data;
	}
}

export default new FileService();
