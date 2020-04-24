const { expect } = require("chai");
const path = require("path");
const {
  generateMD5Hash,
  generateMD5FileHash,
  findImagePathsInFolder,
  Queue,
} = require("../utils");

const imagePath = path.resolve(__dirname, "./images/bike.jpg");
const testDir = path.resolve(__dirname);

describe("utils.js", function () {
  it("generateMD5Hash()", () => {
    const hash = generateMD5Hash("hi, my name is jeff");
    expect(hash).to.equal("bee2d7fe299429cb2091f42733ba99b2");
  });

  it("generateMD5FileHash()", () => {
    const hash = generateMD5FileHash(imagePath);
    expect(hash).to.equal("ef27a98a13c032205d18933156805682");
  });

  it("findImagePathsInFolder()", async () => {
    const imagePathsList = await findImagePathsInFolder(testDir);
    expect(imagePathsList.length).to.equal(4);
    expect(imagePathsList[0]).to.equal(
      "/home/alain/src/taggr/src/store/__tests__/images/bike.jpg"
    );
  });

  it("Queue class", async (done) => {
    let value;
    const executor = async (e) => {
      value = e;
      await new Promise((r) => setTimeout(r, 100));
    };

    const customQueue = new Queue(executor);
    customQueue.add("hi");
    customQueue.add("bye");

    expect(value).to.equal("hi");

    done();
  });
});
