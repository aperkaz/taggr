import { types } from "taggr-shared";

import filterImagesWithLocationFactory from "./filter-images-with-location";
import { Type as DatabaseType } from "../../database";
import { Type as imageServiceType } from "../../services/image";

const IMAGE_WITH_LOCATION: types.ImageWithLocation = {
	hash: "hash-2",
	path: "file:///Users/path/image2.jpeg",
	rawPath: "Users/path/image2.jpeg",
	tags: [],
	location: { latitude: 1, longitude: 2 },
	creationDate: 2,
};

describe("handler - filter images with location", () => {
	let db: DatabaseType, imageService: imageServiceType, sendToFrontend: any;

	beforeEach(() => {
		db = { get: jest.fn() } as any;

		imageService = ({
			filterImagesWithLocation: jest.fn(() => []),
		} as any) as imageServiceType;

		sendToFrontend = jest.fn();
	});

	it("should send all images to FE, when DB images pass the filter", () => {
		imageService = ({
			filterImagesWithLocation: () => [IMAGE_WITH_LOCATION],
		} as any) as imageServiceType;

		const filterImages = filterImagesWithLocationFactory({
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
			payload: [IMAGE_WITH_LOCATION],
			type: "frontend_set-images-with-location",
		});
	});

	it("should not send images to FE, when DB images dont pass filter", () => {
		imageService = ({
			filterImagesWithLocation: () => [],
		} as any) as imageServiceType;

		const filterImages = filterImagesWithLocationFactory({
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
			type: "frontend_set-images-with-location",
		});
	});
});
