const calculateTags = require("../customTags");

describe("calculateTags()", () => {
  test("with imageNetClassIds", () => {
    const tags = calculateTags([397], []);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animal"]);
  });

  test("with cocoSsdClassNames", () => {
    const tags = calculateTags([], ["bird"]);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animal"]);
  });

  test("with imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags([397], ["bird"]);

    expect(tags.length).toBe(1);
    expect(tags).toEqual(["animal"]);
  });

  test("with empty imageNetClassIds and cocoSsdClassNames", () => {
    const tags = calculateTags([], []);

    expect(tags.length).toBe(0);
  });
});

// WHAT

describe("custom tag: animal", () => {
  const tagName = "animal";

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

describe("custom tag: vehicle", () => {
  let tagName = "vehicle";

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

describe("custom tag: boat", () => {
  let tagName = "boat";

  const validImageNetClassIds = [472];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = ["boat"];
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

describe("custom tag: drink", () => {
  let tagName = "drink";

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

describe("custom tag: sport", () => {
  let tagName = "sport";

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

// WHERE

describe("custom tag: nature", () => {
  let tagName = "nature";

  const validImageNetClassIds = [970];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = [];
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

    expect(tags).toEqual([]);
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

describe("custom tag: water", () => {
  let tagName = "water";

  const validImageNetClassIds = [525];
  const invalidImageNetClassIds = [99999];

  const validCocoSsdClassNames = [];
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

    expect(tags).toEqual([]);
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

// PEOPLE

describe("custom tag: person", () => {
  let tagName = "person";

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
