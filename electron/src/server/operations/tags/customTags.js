const range = require("lodash.range");
const get = require("lodash.get");

/**
 * Return true is an image classifies as the given tagName.
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

  console.log(tags);

  return tags;
};

const CUSTOM_TAGS = {
  // when
  // { name: "night" },
  // { name: "morning" },
  // what
  // { name: "dark" },
  // { name: "bright" },
  animal: {
    name: "animal",
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
  vehicle: {
    name: "vehicle",
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
    ],
    cocoSsdClassNames: [
      "bicycle",
      "car",
      "motorcycle",
      "airplane",
      "bus",
      "train",
      "truck",
    ],
  },
  boat: {
    name: "boat",
    imageNetClassIds: [
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
    cocoSsdClassNames: ["boat"],
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
  drink: {
    name: "drink",
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
  sport: {
    name: "sport",
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
  // where
  nature: {
    name: "nature",
    imageNetClassIds: [500, 703, 803, ...range(970, 981), ...range(984, 998)],
  },
  water: { name: "water", imageNetClassIds: [525, 562, 563, 842] },
  // people
  person: {
    name: "person",
    cocoSsdClassNames: ["person"],
  },
};

module.exports = calculateTags;
