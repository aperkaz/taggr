const { expect } = require("chai");
const {
  generateMD5FileHash,
  recursivelyFindImages,
  constructImageMap,
} = require("../src/utils");

const imagePath = "/home/alain/src/privatus/test/testImage.jpg";
const testDir = "/home/alain/src/privatus/test";

describe("utils.js", function () {
  it("generateMD5FileHash()", () => {
    const hash = generateMD5FileHash(imagePath);

    // md5 hash of file -> 68d26b9ddf35a8b08d49dbee7ce37305
    expect(hash).to.equal("68d26b9ddf35a8b08d49dbee7ce37305");
  });

  it("recursivelyFindImages()", async () => {
    const imagePathArray = await recursivelyFindImages(testDir);

    expect(imagePathArray.length).to.equal(1);
  });

  it("constructImageMap()", () => {
    const imageMap = constructImageMap([imagePath]);

    expect(imageMap).to.deep.equal({
      "68d26b9ddf35a8b08d49dbee7ce37305": {
        path: "/home/alain/src/privatus/test/testImage.jpg",
        tags: [],
      },
    });
  });
});
