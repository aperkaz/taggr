import normalize from "normalize-path";

const normalizePath = (imagePath) => {
  // fixes linux / windows compatibility
  const normalizedImagePath = normalize(imagePath);
  return normalizedImagePath.startsWith("http")
    ? normalizedImagePath
    : `file://${normalizedImagePath}`;
};

export default normalizePath;
