const { expect } = require("chai");
const {
  generateMD5FileHash,
  recursivelyFindPictures,
  constructPictureMap,
} = require("../src/utils");

const picturePath = "/home/alain/src/privatus/test/testPicture.jpg";
const testDir = "/home/alain/src/privatus/test";

describe("utils.js", function () {
  it("generateMD5FileHash()", () => {
    const hash = generateMD5FileHash(picturePath);

    // md5 hash of file -> 68d26b9ddf35a8b08d49dbee7ce37305
    expect(hash).to.equal("68d26b9ddf35a8b08d49dbee7ce37305");
  });

  it("recursivelyFindPictures()", async () => {
    const picturePathArray = await recursivelyFindPictures(testDir);

    expect(picturePathArray.length).to.equal(1);
  });

  it("constructPictureMap()", () => {
    const pictureMap = constructPictureMap([picturePath]);

    expect(pictureMap).to.deep.equal({
      "68d26b9ddf35a8b08d49dbee7ce37305": {
        path: "/home/alain/src/privatus/test/testPicture.jpg",
        tags: [],
      },
    });
  });
});
