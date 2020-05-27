import range from "lodash.range";

// // when
// const night;
// const morning;
// // what
// const dark;
// const bright;
// const vehicle;
// const animal;
// const food;
// const drink;
// const sports;
// // where
// const mountain;
// const waterside ;
// // people
// const happy;
// const sad;
// const surprised;
// const alone;
// const peopleGroup;

const CUSTOM_TAGS = [
  // when
  // { name: "night" },
  // { name: "morning" },
  // what
  // { name: "dark" },
  // { name: "bright" },
  // {
  //   name: "vehicle",
  //   imageNetClassIds: [],
  //   cocoSsdClassIds: [],
  // },
  {
    name: "animal",
    calculate: (imageNetClassIds, cocoSsdClassNames) => {
      if (imageNetClassIds.some((number) => 0 <= number && number <= 397)) {
        return true;
      }

      const animalCocoSsdClassName = [
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
      ];
      if (
        cocoSsdClassNames.some((name) => animalCocoSsdClassName.includes(name))
      ) {
        return true;
      }

      return false;
    },
  },
  // {
  //   name: "vehicle",
  //   imageNetClassIds: [403,404,407,408,],
  //   cocoSsdClassIds: [...range(2, 10)],
  // },
  // {
  //   name: "food",
  //   imageNetClassIds: [],
  //   cocoSsdClassIds: [],
  // },
  // {
  //   name: "sports",
  //   imageNetClassIds: [],
  //   cocoSsdClassIds: [],
  // },
  // where

  // people
];

export default CUSTOM_TAGS;
