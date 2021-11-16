import { types } from "taggr-shared";

import filterImagesFactory from "./filter-images";
import { Type as DatabaseType } from "../../database";
import { Type as imageServiceType } from "../../services/image";

const IMAGE: types.Image = {
	hash: "hash-1",
	path: "file:///Users/path/image1.jpeg",
	rawPath: "Users/path/image1.jpeg",
	tags: [],
	location: null,
	creationDate: 1,
};
const IMAGE_WITH_LOCATION: types.ImageWithLocation = {
	hash: "hash-2",
	path: "file:///Users/path/image2.jpeg",
	rawPath: "Users/path/image2.jpeg",
	tags: [],
	location: { latitude: 1, longitude: 2 },
	creationDate: 2,
};

describe("handler - filter images", () => {
	let db: DatabaseType, imageService: imageServiceType, sendToFrontend: any;

	beforeEach(() => {
		db = { get: jest.fn() } as any;

		imageService = ({
			filterImages: jest.fn(() => []),
		} as any) as imageServiceType;

		sendToFrontend = jest.fn();
	});

	it("should send all images to FE, when DB images pass the filter", () => {
		imageService = ({
			filterImages: () => [IMAGE, IMAGE_WITH_LOCATION],
		} as any) as imageServiceType;

		const filterImages = filterImagesFactory({
			db,
			imageService,
			sendToFrontend,
		});

		filterImages({
			fromDate: null,
			toDate: null,
			tags: [],
		});

		expect(sendToFrontend).toHaveBeenCalledWith({
			payload: [IMAGE, IMAGE_WITH_LOCATION],
			type: "frontend_set-images",
		});
	});

	it("should not send images to FE, when DB images dont pass filter", () => {
		imageService = ({
			filterImages: () => [],
		} as any) as imageServiceType;

		const filterImages = filterImagesFactory({
			db,
			imageService,
			sendToFrontend,
		});

		filterImages({
			fromDate: null,
			toDate: null,
			tags: [],
		});

		expect(sendToFrontend).toHaveBeenCalledWith({
			payload: [], // no image passed the filter
			type: "frontend_set-images",
		});
	});
});
