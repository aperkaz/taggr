const filter = require("./filter");

const baseImageProps = {
  hash: "imageHash",
  path: "./path",
  rawPath: "./path",
  location: { latitude: null, longitude: null },
};

const IMAGE_MAP = {
  image1: {
    ...baseImageProps,
    tags: ["animal", "vehicle"],
    creationDate: 100,
  },
  image2: {
    ...baseImageProps,
    tags: ["vehicle"],
    creationDate: 200,
  },
  image3: {
    ...baseImageProps,
    tags: [],
    creationDate: 300,
  },
};

const IMAGE_MAP_LOCATION = {
  image1: {
    ...baseImageProps,
    tags: ["animal", "vehicle"],
    creationDate: 100,
    location: { latitude: 100, longitude: 100 },
  },
  image2: {
    ...baseImageProps,
    tags: ["vehicle"],
    creationDate: 200,
    location: { latitude: 100, longitude: 100 },
  },
  image3: {
    ...baseImageProps,
    tags: [],
    creationDate: 300,
    location: { latitude: 100, longitude: 100 },
  },
};

describe.skip("isDateInRange()", () => {
  test("date not set", () => {
    const isDateInRange = filter.isDateInRange({
      date: null,
      fromDate: 100,
      toDate: 999,
    });

    expect(isDateInRange).toBe(false);
  });
  test("fromDate not set", () => {
    const isDateInRange = filter.isDateInRange({
      date: 100,
      fromDate: null,
      toDate: 999,
    });

    expect(isDateInRange).toBe(true);
  });
  test("toDate not set", () => {
    const isDateInRange = filter.isDateInRange({
      date: 100,
      fromDate: 50,
      toDate: null,
    });

    expect(isDateInRange).toBe(true);
  });
  test("fromDate and toDate not set", () => {
    const isDateInRange = filter.isDateInRange({
      date: null,
      fromDate: null,
      toDate: 100,
    });

    expect(isDateInRange).toBe(true);
  });
  test("date, fromDate and toDate not set", () => {
    const isDateInRange = filter.isDateInRange({
      date: null,
      fromDate: null,
      toDate: null,
    });

    expect(isDateInRange).toBe(true);
  });

  test("date, fromDate and toDate set", () => {
    const isDateInRange = filter.isDateInRange({
      date: 190,
      fromDate: 100,
      toDate: 9898868,
    });

    expect(isDateInRange).toBe(true);
  });

  test("fromDate later than toDate set", () => {
    const isDateInRange = filter.isDateInRange({
      date: 190,
      fromDate: 9898868,
      toDate: 100,
    });

    expect(isDateInRange).toBe(false);
  });

  test("date, fromDate and toDate set and negative", () => {
    const isDateInRange = filter.isDateInRange({
      date: -190,
      fromDate: -9999,
      toDate: 9898868,
    });

    expect(isDateInRange).toBe(true);
  });
});

describe.skip("filter images", () => {
  test("fromDate and toDate null, all tags", () => {
    const { images, imagesWithLocation } = filter.filterImages(IMAGE_MAP, {
      fromDate: null,
      toDate: null,
      tags: [],
    });

    expect(images.length).toBe(3);
    expect(imagesWithLocation.length).toBe(3);
  });

  test("fromDate set, toDate null, all tags", () => {
    const { images, imagesWithLocation } = filter.filterImages(IMAGE_MAP, {
      fromDate: 200,
      toDate: null,
      tags: [],
    });

    expect(images.length).toBe(2);
    expect(images[0].creationDate).toBe(200);
    expect(imagesWithLocation.length).toBe(2);
    expect(imagesWithLocation[0].creationDate).toBe(200);
  });

  test("fromDate set, toDate set, all tags", () => {
    const { images, imagesWithLocation } = filter.filterImages(IMAGE_MAP, {
      fromDate: 200,
      toDate: 250,
      tags: [],
    });

    expect(images.length).toBe(1);
    expect(images[0].creationDate).toBe(200);
    expect(imagesWithLocation.length).toBe(1);
    expect(imagesWithLocation[0].creationDate).toBe(200);
  });

  test("fromDate set, toDate set, vehicle tag", () => {
    const { images, imagesWithLocation } = filter.filterImages(IMAGE_MAP, {
      fromDate: 100,
      toDate: 250,
      tags: ["animal"],
    });

    expect(images.length).toBe(1);
    expect(images[0].creationDate).toBe(100);
    expect(imagesWithLocation.length).toBe(1);
    expect(imagesWithLocation[0].creationDate).toBe(100);
  });

  test("fromDate set, toDate set, vehicle tag (wrong dates)", () => {
    const { images, imagesWithLocation } = filter.filterImages(IMAGE_MAP, {
      fromDate: 200,
      toDate: 250,
      tags: ["animal"],
    });

    expect(images.length).toBe(0);
    expect(imagesWithLocation.length).toBe(0);
  });
});
