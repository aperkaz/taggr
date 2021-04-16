import get from "lodash.get";

import { getClassificationIds } from "./types/classification";
import { getObjectRecognitionClassNames } from "./types/objectRecognition";
import { CUSTOM_TAGS } from "./types/custom_tags";

/**
 * Return true is an image classifies as the given tagName.
 *
 * @param {number[]} imageNetClassIds
 * @param {string[]} cocoSsdClassNames
 * @param {string} tagName
 */
const calculateTag = (imageNetClassIds, cocoSsdClassNames, tagName) => {
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

/**
 * Return list of custom tags for image.
 *
 * @param {number[]} imageNetClassIds
 * @param {string[]} cocoSsdClassNames
 * @returns {string[]}
 */
const calculateTags = (imageNetClassIds, cocoSsdClassNames) => {
  const tags = [];

  Object.keys(CUSTOM_TAGS).forEach((tagName) => {
    if (calculateTag(imageNetClassIds, cocoSsdClassNames, tagName)) {
      tags.push(tagName);
    }
  });

  return tags;
};

/**
 * Get custom tags for image
 * @param {Image} image
 * @returns {Promise<string[]>}
 */
export const getTags = async (image) => {
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
