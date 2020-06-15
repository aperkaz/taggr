// const { getImageLocation } = require("./location");
// const { classifyImage } = require("../imageRecognition/classification");
// const { loadImageAsUint8Array, getImageTensor } = require("./utils");
// const {
//   objectRecognitionImage,
// } = require("../imageRecognition/objectRecognition");
// const calculateTags = require("../deprecated-tags/customTags");

// /**
//  * Process an image and extract all the information
//  * @param {string} imagePath without file://
//  */
// const processImage = async (imagePath) => {
//   console.log(imagePath);
//   let uint8Array = await loadImageAsUint8Array(imagePath);
//   let imageTensor = getImageTensor(uint8Array);

//   // ML classification
//   console.time("classify");
//   const imageNetClassIds = await classifyImage(imageTensor);
//   console.timeEnd("classify");

//   // ML object recognition
//   console.time("object");
//   const cocoSsdClassNames = await objectRecognitionImage(imageTensor);
//   console.timeEnd("object");

//   const data = {
//     location: await getImageLocation(imagePath),
//     tags: calculateTags(imageNetClassIds, cocoSsdClassNames),
//     // isSexy: await isImageSexy(smallImageData),
//   };

//   // clean up
//   uint8Array = null;
//   imageTensor.dispose();
//   imageTensor = null;

//   return data;
// };

// module.exports = processImage;
// TODONOW: remove
