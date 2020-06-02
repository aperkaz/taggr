/**
 * Load image using the DOM Image element
 *
 * @param {String} path
 * @returns {Promise<HTMLImageElement>} loaded image
 */
export const loadImage = async (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = (err) => reject(err);
    img.onload = () => resolve(img);
    img.src = path;
  });
};

/**
 * Generate a ImageData structure from a imagePath.
 * Prepocess using Canvas with maximum height/weight
 *
 * @param {HTMLImageElement} img
 * @returns {Promise<ImageData>} loaded image
 */
export const generateImageData = async (img, minWidthHeigh = 224) => {
  let newHeight = img.height;
  let newWidth = img.width;

  if (img.width > img.height) {
    if (img.height >= minWidthHeigh) {
      const ratio = minWidthHeigh / img.height;

      newHeight = minWidthHeigh;
      newWidth = Math.round(img.width * ratio);
    }
  }

  if (img.width <= img.height) {
    if (img.width >= minWidthHeigh) {
      const ratio = minWidthHeigh / img.width;

      newHeight = Math.round(img.height * ratio);
      newWidth = minWidthHeigh;
    }
  }

  console.log(`w: ${img.width}, h: ${img.height}`);
  console.log(`w: ${newWidth}, h: ${newHeight}`);

  // console.time("transformInCanvas");
  let canvas = new OffscreenCanvas(newWidth, newHeight);

  let ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  const imageData = canvas
    .getContext("2d")
    .getImageData(0, 0, newWidth, newHeight);

  // console.timeEnd("transformInCanvas");

  // clean up
  canvas = null;
  ctx = null;

  return imageData;
};
