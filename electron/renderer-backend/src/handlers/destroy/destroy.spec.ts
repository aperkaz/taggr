import path from "path";
import fs from "fs";
import { promisify } from "util";
const rimraf = promisify(require("rimraf"));

import destroy from "./destroy";

describe("handler - destroy", () => {
	const preprocessImagesPath = path.join(__dirname, "test-path");
	const filePath = path.join(preprocessImagesPath, "dumb-file.ts");

	beforeEach(() => {
		// create temp directory and file
		fs.mkdirSync(preprocessImagesPath);
		fs.writeFileSync(filePath, "dummy file");
	});

	afterEach(async () => {
		await rimraf(preprocessImagesPath, { recursive: true });
	});

	it("should destroy the existing db and emptry the preprocessImagesPath directory", async () => {
		const db = { clear: jest.fn() } as any;

		const destroyHandler = destroy({ db, preprocessImagesPath });
		await destroyHandler();

		expect(db.clear).toHaveBeenCalled();

		expect(fs.existsSync(preprocessImagesPath)).toBe(true);
		expect(!fs.existsSync(filePath)).toBe(true); // directory should be empty
	});
});
