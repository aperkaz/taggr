import { ImageType, ImageHashMapType } from "../../shared/entities";

/**
 * Transfrom the imageHashMap to imageList
 */
export default (imageHashMap: ImageHashMapType): ImageType[] => {
  return Object.keys(imageHashMap).map((key) => ({
    ...imageHashMap[key],
  }));
};
