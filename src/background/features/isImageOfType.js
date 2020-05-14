/**
 * Identify if image is of type, based on path
 *
 * @param {String} imagePath
 * @param {'jpeg'| 'jpg'} type
 */
function isImageOfType(imagePath, type) {
  return (
    imagePath.endsWith(`.${type}`) ||
    imagePath.endsWith(`.${type.toLowerCase()}`) ||
    imagePath.endsWith(`.${type.toUpperCase()}`)
  );
}

export default isImageOfType;
