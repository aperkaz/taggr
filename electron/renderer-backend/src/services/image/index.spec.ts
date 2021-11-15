import imageService from "./index";

import path from "path";
import { promisify } from "util";
import { types } from "taggr-shared";

const baseImageProps = {
	hash: "imageHash",
	path: "./path",
	rawPath: "./raw-path",
};

const IMAGE_MAP: types.ImageHashMap = {
	image1: {
		...baseImageProps,
		tags: ["animals", "vehicles"],
		creationDate: 100,
		location: null,
	},
	image2: {
		...baseImageProps,
		tags: ["vehicles"],
		creationDate: 200,
		location: { latitude: 1, longitude: 2 },
	},
	image3: {
		...baseImageProps,
		tags: [],
		creationDate: 300,
		location: { latitude: 1, longitude: 2 },
	},
};

describe("services - image", () => {
	describe("imageHashMapToImageList", () => {
		it("should return an empty list of images from an empty imageHashMap", () => {
			expect(imageService.imageHashMapToImageList({})).toEqual([]);
		});

		it("should return the list of images from the imageHashMap", () => {
			expect(imageService.imageHashMapToImageList(IMAGE_MAP)).toEqual([
				IMAGE_MAP.image1,
				IMAGE_MAP.image2,
				IMAGE_MAP.image3,
			]);
		});
	});

	describe("getCreationDate", () => {
		const imagePath = path.join(__dirname, "test-data", "image.jpg");

		it("should return the creation date from exif metadata", async () => {
			expect(await imageService.getCreationDate(imagePath)).toBe(1224685789000);
		});
	});

	describe("getLocation", () => {
		const imagePath = path.join(__dirname, "test-data", "image.jpg");

		it("should return the location from exif metadata", async () => {
			expect(await imageService.getLocation(imagePath)).toEqual({
				latitude: 43.46715666666389,
				longitude: 11.885394999997223,
			});
		});
		it("should return null when there is no exif metadata", async () => {
			expect(await imageService.getLocation("randon/fake/path.jpg")).toEqual(
				null
			);
		});
	});

	describe("doesImagePassFilter", () => {
		it("should return true when the image passes a filter with empty tags", () => {
			const image: types.Image = {
				hash: "imageHash",
				path: "./path",
				rawPath: "./raw-path",
				location: { latitude: 1, longitude: 2 },
				tags: ["animals", "vehicles"],
				creationDate: 100,
			};

			const filters: types.Filters = { fromDate: 50, toDate: 150, tags: [] };

			expect(imageService.doesImagePassFilter(image, filters)).toEqual(true);
		});

		it("should return true when the image passes a filter with tags", () => {
			const image: types.Image = {
				hash: "imageHash",
				path: "./path",
				rawPath: "./raw-path",
				location: { latitude: 1, longitude: 2 },
				tags: ["animals", "vehicles"],
				creationDate: 100,
			};

			const filters: types.Filters = {
				fromDate: 50,
				toDate: 150,
				tags: ["animals"],
			};

			expect(imageService.doesImagePassFilter(image, filters)).toEqual(true);
		});

		it("should return false when the image does not match the filter tags", () => {
			const image: types.Image = {
				hash: "imageHash",
				path: "./path",
				rawPath: "./raw-path",
				location: { latitude: 1, longitude: 2 },
				tags: ["animals", "vehicles"],
				creationDate: 100,
			};

			const filters: types.Filters = {
				fromDate: 50,
				toDate: 150,
				tags: ["drinks"], // not present in the image list
			};

			expect(imageService.doesImagePassFilter(image, filters)).toEqual(false);
		});

		it("should return false when the image does not match the filter date", () => {
			const image: types.Image = {
				hash: "imageHash",
				path: "./path",
				rawPath: "./raw-path",
				location: { latitude: 1, longitude: 2 },
				tags: ["animals", "vehicles"],
				creationDate: 200, // out of range, more than `toDate`
			};

			const filters: types.Filters = {
				fromDate: 50,
				toDate: 150,
				tags: ["animals"],
			};

			expect(imageService.doesImagePassFilter(image, filters)).toEqual(false);
		});
	});

	describe("filterImages", () => {
		it("should return an empty array if no image matches the filters", async () => {
			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: ["drinks"],
					},
				})
			).toEqual([]);
		});

		it("should return an empty array if no images are provided", async () => {
			expect(
				imageService.filterImages({
					imageMap: {},
					currentImageHashes: Object.keys({}),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: [],
					},
				})
			).toEqual([]);
		});

		it("should return all images if the filter tag is an empty array, still filtered by date", async () => {
			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: [],
					},
				}).length
			).toBe(3);

			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 250, // image3 is out of the date range
						tags: [],
					},
				}).length
			).toBe(2);
		});

		it("should return an array of images matching by tag and date", async () => {
			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: ["image1", "image2", "image3"],
					filters: {
						fromDate: 50,
						toDate: 150,
						tags: ["animals"],
					},
				}).length
			).toBe(1);

			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: ["image1", "image2", "image3"],
					filters: {
						fromDate: 0,
						toDate: 1,
						tags: ["animals"],
					},
				}).length
			).toBe(0); // date changed, leaving image1 out of range
		});
	});

	describe("filterImagesWithLocation", () => {
		it("should return an empty array if no image matches the filters", async () => {
			expect(
				imageService.filterImagesWithLocation({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: ["drinks"],
					},
				})
			).toEqual([]);
		});

		it("should return an empty array if no images are provided", async () => {
			expect(
				imageService.filterImages({
					imageMap: {},
					currentImageHashes: Object.keys({}),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: [],
					},
				})
			).toEqual([]);
		});

		it("should return all images with location if the filter tag is an empty array, still filtered by date", async () => {
			expect(
				imageService.filterImagesWithLocation({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 350,
						tags: [],
					},
				}).length
			).toBe(2);

			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: Object.keys(IMAGE_MAP),
					filters: {
						fromDate: 50,
						toDate: 150, // image3 is out of the date range
						tags: [],
					},
				}).length
			).toBe(1);
		});

		it("should return an array of images matching by tag and date", async () => {
			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: ["image1", "image2", "image3"],
					filters: {
						fromDate: 50,
						toDate: 150,
						tags: ["animals"],
					},
				}).length
			).toBe(1);

			expect(
				imageService.filterImages({
					imageMap: IMAGE_MAP,
					currentImageHashes: ["image1", "image2", "image3"],
					filters: {
						fromDate: 0,
						toDate: 1,
						tags: ["animals"],
					},
				}).length
			).toBe(0); // date changed, leaving image1 out of range
		});
	});
});
