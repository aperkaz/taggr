const operation = require("../operation");

jest.mock("../load", () => ({
  loadEXIFData: jest.fn(),
  loadFilesystemStats: jest.fn(),
}));
const { loadEXIFData, loadFilesystemStats } = require("../load");

const DATE_FIRST = "2011:01:01 01:01:01";
const DATE_SECOND = "2012:01:01 01:01:01";
const DATE_THIRD = "2013:01:01 01:01:01";

// Note that the unix times are encoded as GMT+01:00. This is the expected behaviour
const dateStringToUnix = {
  DATE_FIRST: 1293840061000,
  DATE_SECOND: 1325376061000,
  DATE_THIRD: 1356998461000,
};

describe("getFileCreationDate()", () => {
  test("non existent file", async () => {
    loadEXIFData.mockImplementation(() => null);
    loadFilesystemStats.mockImplementation(() => null);

    const creationDate = await operation.getFileCreationDate("./fake/path");
    expect(creationDate).toEqual(null);
  });

  test("file with exif.DateTimeOriginal exif data", async () => {
    loadEXIFData.mockImplementation(() => ({
      exif: {
        DateTimeOriginal: DATE_FIRST,
        CreateDate: DATE_SECOND,
      },
      image: { ModifyDate: DATE_THIRD },
    }));
    loadFilesystemStats.mockImplementation(() => null);

    const creationDate = await operation.getFileCreationDate("./path");
    expect(creationDate).toEqual(dateStringToUnix.DATE_FIRST);
  });

  test("file with exif.CreateDate exif data", async () => {
    loadEXIFData.mockImplementation(() => ({
      exif: {
        CreateDate: DATE_SECOND,
      },
      image: { ModifyDate: DATE_THIRD },
    }));
    loadFilesystemStats.mockImplementation(() => null);

    const creationDate = await operation.getFileCreationDate("./path");
    expect(creationDate).toEqual(dateStringToUnix.DATE_SECOND);
  });

  test("file with image.ModifyDate exif data", async () => {
    loadEXIFData.mockImplementation(() => ({
      image: { ModifyDate: DATE_THIRD },
    }));
    loadFilesystemStats.mockImplementation(() => null);

    const creationDate = await operation.getFileCreationDate("./path");
    expect(creationDate).toEqual(dateStringToUnix.DATE_THIRD);
  });

  test("file without exif data, with file stats birthday", async () => {
    loadEXIFData.mockImplementation(() => null);
    loadFilesystemStats.mockImplementation(() => ({
      birthtime: new Date("January 1, 2011 01:01:01 GMT+01:00"),
      mtime: new Date("January 1, 2012 01:01:01 GMT+01:00"),
    }));

    const creationDate = await operation.getFileCreationDate("./path");
    expect(creationDate).toEqual(dateStringToUnix.DATE_FIRST);
  });

  test("file without exif data, with file stats mtime", async () => {
    loadEXIFData.mockImplementation(() => null);
    loadFilesystemStats.mockImplementation(() => ({
      mtime: new Date("January 1, 2012 01:01:01 GMT+01:00"),
    }));

    const creationDate = await operation.getFileCreationDate("./path");
    expect(creationDate).toEqual(dateStringToUnix.DATE_SECOND);
  });
});
