import get from "lodash.get";
import range from "lodash.range";
import { types } from "taggr-shared";

import { getClassificationIds } from "./methods/classification";
import { getObjectRecognitionClassNames } from "./methods/objectRecognition";

/**
 * Custom mapping from classification ids and object recognition classes, to our own tags.
 */
const CUSTOM_TAG_MAPPING: {
	[key in types.Tag]: {
		name: string;
		imageNetClassIds?: number[];
		cocoSsdClassNames?: string[];
	};
} = {
	// WHAT
	people: {
		name: "people",
		cocoSsdClassNames: ["person"],
	},
	animals: {
		name: "animals",
		imageNetClassIds: [...range(0, 398), 537],
		cocoSsdClassNames: [
			"bird",
			"cat",
			"dog",
			"horse",
			"sheep",
			"cow",
			"elephant",
			"bear",
			"zebra",
			"giraffe",
		],
	},
	vehicles: {
		name: "vehicles",
		imageNetClassIds: [
			403,
			404,
			407,
			408,
			436,
			444,
			468,
			475,
			479,
			511,
			555,
			565,
			569,
			573,
			574,
			575,
			603,
			627,
			654,
			656,
			665,
			670,
			671,
			675,
			705,
			734,
			751,
			779,
			785,
			817,
			820,
			847,
			864,
			866,
			867,
			870,
			874,
			880,
			895,
			// boats:
			472,
			484,
			510,
			554,
			576,
			625,
			628,
			724,
			780,
			814,
			833,
			871,
		],
		cocoSsdClassNames: [
			"bicycle",
			"car",
			"motorcycle",
			"airplane",
			"bus",
			"train",
			"truck",
			"boat",
		],
	},
	food: {
		name: "food",
		imageNetClassIds: [
			567,
			659,
			762,
			766,
			777,
			809,
			813,
			827,
			828,
			859,
			891,
			909,
			...range(923, 966),
		],
		cocoSsdClassNames: [
			"fork",
			"knife",
			"spoon",
			"bowl",
			"banana",
			"apple",
			"sandwich",
			"orange",
			"broccoli",
			"carrot",
			"hot dog",
			"pizza",
			"donut",
			"cake",
			"dining table",
		],
	},
	drinks: {
		name: "drinks",
		imageNetClassIds: [
			503,
			504,
			505,
			550,
			647,
			653,
			737,
			810,
			849,
			898,
			899,
			901,
			907,
			...range(966, 970),
		],
		cocoSsdClassNames: ["bottle", "wine glass", "cup"],
	},
	sports: {
		name: "sports",
		imageNetClassIds: [
			701,
			722,
			736,
			747,
			768,
			770,
			795,
			796,
			801,
			802,
			805,
			852,
			981,
			983,
		],
		cocoSsdClassNames: [
			"frisbee",
			"skis",
			"snowboard",
			"sports ball",
			"kite",
			"baseball bat",
			"baseball glove",
			"skateboard",
			"surfboard",
			"tennis racket",
		],
	},
};

/**
 * Return true is an image classifies as the given tagName.
 */
const calculateTag = (
	imageNetClassIds: number[],
	cocoSsdClassNames: string[],
	tagName: types.Tag
): boolean => {
	const tagImageNetClassIds = get(
		CUSTOM_TAG_MAPPING[tagName],
		"imageNetClassIds",
		null
	);
	const tagCocoSsdClassNames = get(
		CUSTOM_TAG_MAPPING[tagName],
		"cocoSsdClassNames",
		null
	);

	if (
		imageNetClassIds &&
		tagImageNetClassIds &&
		imageNetClassIds.some((id) => tagImageNetClassIds.includes(id))
	)
		return true;

	if (
		cocoSsdClassNames &&
		tagCocoSsdClassNames &&
		cocoSsdClassNames.some((name) => tagCocoSsdClassNames.includes(name))
	)
		return true;

	return false;
};

/**
 * Calculates custom tags from classification ids and object recognition class names.
 * NOT to be used directly!!
 */
export const calculateTags = (
	imageNetClassIds: number[],
	cocoSsdClassNames: string[]
): types.Tag[] => {
	const tags: types.Tag[] = [];

	Object.keys(CUSTOM_TAG_MAPPING).forEach((tagName) => {
		if (
			calculateTag(imageNetClassIds, cocoSsdClassNames, tagName as types.Tag)
		) {
			tags.push(tagName as types.Tag);
		}
	});

	return tags;
};

/**
 * Extract the custom tags from a given image.
 * Uses machine learning models for classification and object recognition.
 */
export const generateImageTags = async (
	image: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): Promise<string[]> => {
	// ML classification
	console.time("classify");
	const imageNetClassIds = await getClassificationIds(image);
	console.timeEnd("classify");

	// ML object recognition
	console.time("object");
	const cocoSsdClassNames = await getObjectRecognitionClassNames(image);
	console.timeEnd("object");

	return calculateTags(imageNetClassIds, cocoSsdClassNames);
};
