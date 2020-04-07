const { expect } = require("chai");
const {
  generateMD5FileHash,
  recursivelyFindImages,
  constructImageMap,
} = require("../src/utils");

const imagePath = "/home/alain/src/privatus/test/images/beetle.jpg";
const testDir = "/home/alain/src/privatus/test/images";

describe("utils.js", function () {
  it("generateMD5FileHash()", () => {
    const hash = generateMD5FileHash(imagePath);

    // md5 hash of file -> dd1e50fa2701d667f44cc0ec801ab32f
    expect(hash).to.equal("dd1e50fa2701d667f44cc0ec801ab32f");
  });

  it("recursivelyFindImages()", async () => {
    const imagePathArray = await recursivelyFindImages(testDir);

    expect(imagePathArray.length).to.equal(18);
  });

  it("constructImageMap()", () => {
    const imageMap = constructImageMap([imagePath]);

    expect(imageMap).to.deep.equal({
      dd1e50fa2701d667f44cc0ec801ab32f: {
        path: imagePath,
        tags: [],
      },
    });
  });
});
