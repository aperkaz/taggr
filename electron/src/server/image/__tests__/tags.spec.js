const { calculateTags } = require("../tags");

jest.mock("../machineLearning/classification");

describe("calculateTags()", () => {
  test("with imageNetClassIds", () => {
    const tags = calculateTags([397], []);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animals"]);
  });

  test("with cocoSsdClassNames", () => {
    const tags = calculateTags([], ["bird"]);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animals"]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags([397], ["bird"]);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animals"]);
  });

  test("with empty imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags([], []);

    expect(tags.length).toBe(0);
  });
});

// WHAT

describe("custom tag: people", () => {
  let tagName = "people";

  const validImageNetClassIds = [];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["person"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

describe("custom tag: animals", () => {
  const tagName = "animals";

  const validImageNetClassIds = [397];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["bird"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([tagName]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

describe("custom tag: vehicles", () => {
  let tagName = "vehicles";

  const validImageNetClassIds = [403];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["bus"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([tagName]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

describe("custom tag: food", () => {
  let tagName = "food";

  const validImageNetClassIds = [766];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["pizza"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([tagName]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

describe("custom tag: drinks", () => {
  let tagName = "drinks";

  const validImageNetClassIds = [503];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["cup"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([tagName]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

describe("custom tag: sports", () => {
  let tagName = "sports";

  const validImageNetClassIds = [701];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["skis"];
  const invalidCocoSsdClassNames = ["fake class"];

  test("with valid imageNetClassIds", () => {
    const tags = calculateTags(validImageNetClassIds, []);

    expect(tags).toEqual([tagName]);
  });
  test("with invalid imageNetClassIds", () => {
    const tags = calculateTags(invalidImageNetClassIds, []);

    expect(tags.length).toBe(0);
  });
  test("with valid cocoSsdClassNames", () => {
    const tags = calculateTags([], validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });

  test("with invalid cocoSsdClassNames", () => {
    const tags = calculateTags([], invalidCocoSsdClassNames);

    expect(tags).toEqual([]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags(validImageNetClassIds, validCocoSsdClassNames);

    expect(tags).toEqual([tagName]);
  });
});

// EMOTIONS
// TODO: add tests

// AGE
// TODO: add tests
