export class ImageEntity {
  /**
   *
   * @param {{
   * hash: string,
   * path: string,
   * rawPath: string,
   * tags: string[] | null,
   * location: {lat: string, lon: string} | null
   * }} params
   */
  constructor({ hash, path, rawPath, tags, location }) {
    this.hash = hash;
    this.path = path;
    this.rawPath = rawPath;
    this.tags = tags;
    this.location = location;
  }

  /**
   * Set ML tags
   * @param {string[]} tags
   */
  setTags(tags) {
    this.tags = tags;
  }

  /**
   * Set image location
   * @param {{lat: string, long: string}} location
   */
  setLocation(location) {
    this.location = location;
  }
}
