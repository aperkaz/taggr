import normalize from "normalize-path";

const normalizePath = (imagePath: string): string => {
  console.log("normalizePath: ", imagePath);
  let normalizedImagePath;
  // fixes linux / windows compatibility
  try {
    normalizedImagePath = normalize(imagePath);
    return normalizedImagePath.startsWith("http")
      ? normalizedImagePath
      : `file://${normalizedImagePath}`;
  } catch (e) {
    console.log(e);
  }
};

export default normalizePath;
