const { expect } = require("chai");
const { classifyImage } = require("../src/imageRecognition");

const imagePath = "/home/alain/src/privatus/test/images/beetle.jpg";

describe("imageRecognition.js", function () {
  it.skip("classifyImage()", async () => {
    const imageClassification = await classifyImage(imagePath);

    expect(imageClassification).to.deep.equal({
      "68d26b9ddf35a8b08d49dbee7ce37305": {
        path: imagePath,
        tags: [],
      },
    });
  });
});
