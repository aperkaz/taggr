export interface LocationType {
  latitude: number;
  longitude: number;
}

export interface ImageType {
  hash: string;
  path: string;
  rawPath: string;
  tags?: string[];
  location: LocationType;
  creationDate?: number;
}

export interface ImageHashMapType {
  [imageHash: string]: ImageType;
}

export interface FiltersType {
  fromDate?: number;
  toDate?: number;
  tags: string[];
}

export const ImageFactory = (args: Partial<ImageType>): ImageType => ({
  hash: "empty-hash",
  path: "empty-path",
  rawPath: "empty-rawpath",
  tags: null,
  location: null,
  creationDate: null,
  ...args,
});
