import { ImageType } from "../../shared/entities";
import supportImage from "../../FE/statics/support.png";
import db, { PROPERTIES } from "./db";

const PLACEHOLDER: ImageType = {
  hash: "support-placeholder",
  path: supportImage,
  rawPath: supportImage,
};

const GAP_BETWEEN_PLACEHOLDERS = 14;

/**
 * Add placeholders, if the users is not a supporter.
 */
export const addImagePlaceholders = (images: ImageType[]): ImageType[] => {
  if (db.get(PROPERTIES.IS_SUPPORTER)) return images;

  const imagesWithPlaceholders: ImageType[] = JSON.parse(
    JSON.stringify(images)
  );

  const arrayLength = imagesWithPlaceholders.length;

  const placeholderCount = arrayLength / GAP_BETWEEN_PLACEHOLDERS;

  for (let i = 1; i <= placeholderCount; i++) {
    imagesWithPlaceholders.splice(i * GAP_BETWEEN_PLACEHOLDERS, 0, PLACEHOLDER);
  }

  return imagesWithPlaceholders;
};
