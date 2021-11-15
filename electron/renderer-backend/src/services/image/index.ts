import get from "lodash.get";
import fs from "fs";
import sharp from "sharp";
import { promisify } from "util";

import { types } from "taggr-shared";
import dateService from "../date";
import fileService from "../file";

const readStats = promisify(fs.stat);

import { isArrayContained, toDecimal } from "../../utils";

type dateServiceType = typeof dateService;
type fileServiceType = typeof fileService;

class ImageService {
	private dateService: dateServiceType;
	private fileService: fileServiceType;

	constructor(dateService: dateServiceType, fileService: fileServiceType) {
		this.dateService = dateService;
		this.fileService = fileService;
	}

	/**
	 * Load HTMLImageELement from src. Cant be tested in Jest, as it depends on browser's `Image`.
	 */
	loadImageFile(imagePath: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = imagePath;
		});
	}

	/**
	 * Transfrom the imageHashMap to imageList
	 */
	imageHashMapToImageList(imageHashMap: types.ImageHashMap): types.Image[] {
		return Object.keys(imageHashMap).map((key) => ({
			...imageHashMap[key],
		}));
	}

	/**
	 * Transfrom the imageHashMap to imageList, for images with location
	 */
	imageHashMapToImageListWithLocation(
		imageHashMap: types.ImageHashMap
	): types.ImageWithLocation[] {
		return Object.keys(imageHashMap)
			.map((key) => ({
				...imageHashMap[key],
			}))
			.filter(
				(image) => image.location && image.location !== null
			) as types.ImageWithLocation[];
	}

	/**
	 * Get image-file creation date in UNIX EPOCH
	 */
	async getCreationDate(imagePath: string): Promise<number | null> {
		const exifData = await this.fileService.loadEXIFData(imagePath);
		const exifDateTimeOriginal = get(exifData, "exif.DateTimeOriginal", null);
		const exifCreateDate = get(exifData, "exif.CreateDate", null);
		const exifModifyDate = get(exifData, "image.ModifyDate", null);

		if (exifDateTimeOriginal) {
			return this.dateService.exifDateStringToDate(exifDateTimeOriginal);
		}

		if (exifCreateDate) {
			return this.dateService.exifDateStringToDate(exifCreateDate);
		}

		if (exifModifyDate) {
			return this.dateService.exifDateStringToDate(exifModifyDate);
		}

		const fsStats = await readStats(imagePath);
		const birthtime = get(fsStats, "birthtime", null);
		// the birthtime can be epoch 0, then check the mtime
		if (birthtime) return birthtime.getTime();

		const mtime = get(fsStats, "mtime", null);
		if (mtime) return mtime.getTime();

		return null;
	}

	/**
	 * Get the location info for an image
	 * @param imagePath without file:// prefix
	 */
	async getLocation(imagePath: string): Promise<types.ImageLocation | null> {
		try {
			let exifData: any = await this.fileService.loadEXIFData(imagePath);

			// check if gps is contained
			const latitude = get(exifData, "gps.GPSLatitude", null);
			const longitude = get(exifData, "gps.GPSLongitude", null);

			if (!latitude || !longitude) return null;

			const latDMS = exifData.gps.GPSLatitude;
			const longDMS = exifData.gps.GPSLongitude;

			const geoString = `${get(exifData, "gps.GPSLatitudeRef", "")}${
				latDMS[0]
			}° ${latDMS[1]}' ${latDMS[2]}" ${get(
				exifData,
				"gps.GPSLongitudeRef",
				""
			)}${longDMS[0]}° ${longDMS[1]}' ${longDMS[2]}"`;

			const { lat, lon } = toDecimal(geoString);

			return { latitude: lat, longitude: lon };
		} catch (e) {
			console.error(e);
		}

		return null;
	}

	/**
	 * Calculates if an image passes a given filter
	 */
	doesImagePassFilter(image: types.Image, filters: types.Filters): boolean {
		const { fromDate, toDate, tags: filterTags } = filters;
		const { creationDate, tags: imageTags } = image;

		return (
			this.dateService.isDateInRange({
				date: creationDate,
				fromDate,
				toDate,
			}) && isArrayContained(imageTags, filterTags)
		);
	}

	/**
	 * Filter images
	 */
	filterImages({
		imageMap,
		currentImageHashes,
		filters,
	}: {
		imageMap: types.ImageHashMap;
		currentImageHashes: string[];
		filters: types.Filters;
	}): types.Image[] {
		let images: types.Image[] = [];

		currentImageHashes.forEach((hash) => {
			const image = imageMap[hash];
			if (image && this.doesImagePassFilter(image, filters)) images.push(image);
		});

		return images;
	}
	/**
	 * Filter images with location
	 */
	filterImagesWithLocation({
		imageMap,
		currentImageHashes,
		filters,
	}: {
		imageMap: types.ImageHashMap;
		currentImageHashes: string[];
		filters: types.Filters;
	}): types.ImageWithLocation[] {
		let images: types.ImageWithLocation[] = [];

		currentImageHashes.forEach((hash) => {
			const image = imageMap[hash];
			if (image && image.location && this.doesImagePassFilter(image, filters))
				images.push(image as types.ImageWithLocation);
		});

		return images;
	}

	// TODONOW: conside removing for suporting multiple envs, cleanup sharp dep
	async resizeImage(imagePath: string, outputPath: string) {
		try {
			await sharp(imagePath, {
				failOnError: false,
			}) // failOnError: true, fixes Samsung corrupted pictures
				.jpeg({ quality: 80 })
				.resize(1980, 1080, {
					fit: sharp.fit.outside,
					withoutEnlargement: true,
				})
				.toFile(outputPath);
		} catch (err) {
			console.error(err);
		}
	}
}

export type Type = ImageService;

export default new ImageService(dateService, fileService);
