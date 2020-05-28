import range from "lodash.range";

// // when
// const night;
// const morning;
// // what
// const dark;
// const bright;
// // people
// const happy;
// const sad;
// const surprised;
// const alone;
// const peopleGroup;

/**
 * Return true is an image classifies as the given tagName.
 * @param {number[]} imageNetClassIds
 * @param {string[]} cocoSsdClassNames
 * @param {string} tagName
 */
const calculateTag = (imageNetClassIds, cocoSsdClassNames, tagName) => {
  // console.log(CUSTOM_TAGS);
  // TODONOW: add tests
  if (
    imageNetClassIds.some((name) =>
      CUSTOM_TAGS[tagName].imageNetClassIds.includes(name)
    )
  )
    return true;

  if (
    cocoSsdClassNames.some((name) =>
      CUSTOM_TAGS[tagName].cocoSsdClassNames.includes(name)
    )
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
export const calculateTags = (imageNetClassIds, cocoSsdClassNames) => {
  const tags = [];

  Object.keys(CUSTOM_TAGS).forEach((tagName) => {
    if (calculateTag(imageNetClassIds, cocoSsdClassNames, tagName)) {
      tags.push(tagName);
    }
  });

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
  // {
  //   name: "vehicle",
  //   imageNetClassIds: [
  //     403,
  //     404,
  //     407,
  //     408,
  //     436,
  //     444,
  //     468,
  //     475,
  //     479,
  //     511,
  //     555,
  //     565,
  //     569,
  //     573,
  //     574,
  //     575,
  //     603,
  //     627,
  //     654,
  //     656,
  //     665,
  //     670,
  //     671,
  //     675,
  //     705,
  //     734,
  //     751,
  //     779,
  //     785,
  //     817,
  //     820,
  //     847,
  //     864,
  //     866,
  //     867,
  //     870,
  //     874,
  //     880,
  //     895,
  //   ],
  //   cocoSsdClassNames: [
  //     "bicycle",
  //     "car",
  //     "motorcycle",
  //     "airplane",
  //     "bus",
  //     "train",
  //     "truck",
  //   ],
  // },
  // {
  //   name: "boat",
  //   imageNetClassIds: [
  //     472,
  //     484,
  //     510,
  //     554,
  //     576,
  //     625,
  //     628,
  //     724,
  //     780,
  //     814,
  //     833,
  //     871,
  //   ],
  //   cocoSsdClassNames: ["boat"],
  // },
  // {
  //   name: "food",
  //   imageNetClassIds: [
  //     567,
  //     659,
  //     762,
  //     766,
  //     777,
  //     809,
  //     813,
  //     827,
  //     828,
  //     859,
  //     891,
  //     909,
  //     ...range(923, 966),
  //   ],
  //   cocoSsdClassNames: [
  //     "fork",
  //     "knife",
  //     "spoon",
  //     "bowl",
  //     "banana",
  //     "apple",
  //     "sandwich",
  //     "orange",
  //     "broccoli",
  //     "carrot",
  //     "hot dog",
  //     "pizza",
  //     "donut",
  //     "cake",
  //     "dining table",
  //   ],
  // },
  // {
  //   name: "drink",
  //   imageNetClassIds: [
  //     503,
  //     504,
  //     505,
  //     550,
  //     647,
  //     653,
  //     737,
  //     810,
  //     849,
  //     898,
  //     899,
  //     901,
  //     907,
  //     ...range(966, 970),
  //   ],
  //   cocoSsdClassNames: ["bottle", "wine glass", "cup"],
  // },
  // {
  //   name: "sports",
  //   imageNetClassIds: [701,722,736,747,768,770,795,796,801,802,805,852,981,983],
  //   cocoSsdClassNames: ["frisbee","skis","snowboard","sports ball","kite","baseball bat","baseball glove","skateboard","surfboard","tennis racket"],
  // },
  // where
  // {
  //   name: "nature",
  //   imageNetClassIds: [500, 703, 803, ...range(970, 981), ...range(984, 998)],
  // },
  // { name: "water", imageNetClassIds: [525, 562, 563, 842] },
  // people
  // {
  //   name: "person",
  //   cocoSsdClassIds: ["person"],
  // },
};
