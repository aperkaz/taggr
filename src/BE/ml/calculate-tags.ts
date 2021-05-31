import get from "lodash.get";

import { getClassificationIds } from "./types/classification";
import { getObjectRecognitionClassNames } from "./types/objectRecognition";
import { CUSTOM_TAGS } from "./types/custom_tags";

import logger from "../../shared/logger";

/**
 * Return true is an image classifies as the given tagName.
 */
const calculateTag = (
  imageNetClassIds: number[],
  cocoSsdClassNames: string[],
  tagName: keyof typeof CUSTOM_TAGS
): boolean => {
  const tagImageNetClassIds = get(
    CUSTOM_TAGS[tagName],
    "imageNetClassIds",
    null
  );
  const tagCocoSsdClassNames = get(
    CUSTOM_TAGS[tagName],
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

export const calculateTags = (
  imageNetClassIds: number[],
  cocoSsdClassNames: string[]
): string[] => {
  const tags: string[] = [];

  Object.keys(CUSTOM_TAGS).forEach((tagName: keyof typeof CUSTOM_TAGS) => {
    if (calculateTag(imageNetClassIds, cocoSsdClassNames, tagName)) {
      tags.push(tagName);
    }
  });

  return tags;
};

export const getTags = async (image: HTMLImageElement): Promise<string[]> => {
  // ML classification
  logger.time("classify");
  const imageNetClassIds = await getClassificationIds(image);
  logger.timeEnd("classify");

  // ML object recognition
  logger.time("object");
  const cocoSsdClassNames = await getObjectRecognitionClassNames(image);
  logger.timeEnd("object");

  return calculateTags(imageNetClassIds, cocoSsdClassNames);
};
