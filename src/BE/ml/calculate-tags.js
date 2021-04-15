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

const getTags = async function (path) {
  // ML classification
  console.time("classify");
  const imageNetClassIds = await getClassificationIds(imageTensor);
  console.timeEnd("classify");

  // ML object recognition
  console.time("object");
  const cocoSsdClassNames = await getObjectRecognitionClassNames(imageTensor);
  console.timeEnd("object");

  // clean up
  uint8Array = null;
  imageTensor.dispose();
  imageTensor = null;

  return calculateTags(imageNetClassIds, cocoSsdClassNames);
};
export default getTags;
