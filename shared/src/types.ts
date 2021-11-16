import { messageBus, types } from ".";
import { BE_MESSAGES, FE_MESSAGES } from "./message-bus";

type SETUP_CHANNEL = messageBus.CHANNEL["SETUP"];
type MAIN_CHANNEL = messageBus.CHANNEL["MAIN"];

export type ExifData = {
  image: {
    Artist?: string | undefined;
    Copyright?: string | undefined;
    ExifOffset?: number | undefined;
    ImageHeight?: number | undefined;
    ImageWidth?: number | undefined;
    Make?: string | undefined;
    Model?: string | undefined;
    ModifyDate?: string | undefined;
    Orientation?: number | undefined;
    ResolutionUnit?: number | undefined;
    Software?: string | undefined;
    XResolution?: number | undefined;
    YCbCrPositioning?: number | undefined;
    YResolution?: number | undefined;
  };
  thumbnail: {
    Compression?: number | undefined;
    Orientation?: number | undefined;
    ResolutionUnit?: number | undefined;
    ThumbnailLength?: number | undefined;
    ThumbnailOffset?: number | undefined;
    XResolution?: number | undefined;
    YCbCrPositioning?: number | undefined;
    YResolution?: number | undefined;
  };
  exif: {
    ApertureValue?: number | undefined;
    BrightnessValue?: number | undefined;
    ColorSpace?: number | undefined;
    ComponentsConfiguration?: Buffer | undefined;
    CompressedBitsPerPixel?: number | undefined;
    CreateDate?: string | undefined;
    DateTimeOriginal?: string | undefined;
    ExifImageHeight?: number | undefined;
    ExifImageWidth?: number | undefined;
    ExifVersion?: Buffer | undefined;
    ExposureCompensation?: number | undefined;
    ExposureMode?: number | undefined;
    ExposureProgram?: number | undefined;
    ExposureTime?: number | undefined;
    FileSource?: Buffer | undefined;
    Flash?: number | undefined;
    FlashpixVersion?: Buffer | undefined;
    FNumber?: number | undefined;
    FocalLength?: number | undefined;
    FocalLengthIn35mmFormat?: number | undefined;
    FocalPlaneResolutionUnit?: number | undefined;
    FocalPlaneXResolution?: number | undefined;
    FocalPlaneYResolution?: number | undefined;
    ImageUniqueID?: string | undefined;
    InteropOffset?: number | undefined;
    ISO?: number | undefined;
    LensMake?: string | undefined;
    LensModel?: string | undefined;
    MakerNote?: Buffer | undefined;
    MaxApertureValue?: number | undefined;
    MeteringMode?: number | undefined;
    SceneCaptureType?: number | undefined;
    SceneType?: Buffer | undefined;
    SensingMethod?: number | undefined;
    ShutterSpeedValue?: number | undefined;
    UserComment?: Buffer | undefined;
    WhiteBalance?: number | undefined;
  };
  /**
   * Entire GPS Tags from https://exiftool.org/TagNames/GPS.html are listed.
   * And their types are determined from http://www.exif.org/Exif2-2.PDF.
   */
  gps: {
    GPSAltitude?: number | undefined;
    GPSAltitudeRef?: number | undefined;
    GPSAreaInformation?: Buffer | undefined;
    GPSDateStamp?: string | undefined;
    GPSDestBearing?: number | undefined;
    GPSDestBearingRef?: string | undefined;
    GPSDestDistance?: number | undefined;
    GPSDestDistanceRef?: string | undefined;
    GPSDestLatitude?: number[] | undefined;
    GPSDestLatitudeRef?: string | undefined;
    GPSDestLongitude?: number[] | undefined;
    GPSDestLongitudeRef?: string | undefined;
    GPSDifferential?: number | undefined;
    GPSDOP?: number | undefined;
    GPSHPositioningError?: number | undefined;
    GPSImgDirection?: number | undefined;
    GPSImgDirectionRef?: string | undefined;
    GPSLatitude?: number[] | undefined;
    GPSLatitudeRef?: string | undefined;
    GPSLongitude?: number[] | undefined;
    GPSLongitudeRef?: string | undefined;
    GPSMapDatum?: string | undefined;
    GPSMeasureMode?: string | undefined;
    GPSProcessingMethod?: Buffer | undefined;
    GPSTimeStamp?: number[] | undefined;
    GPSSatellites?: string | undefined;
    GPSSpeed?: number | undefined;
    GPSSpeedRef?: string | undefined;
    GPSStatus?: string | undefined;
    GPSTrack?: number | undefined;
    GPSTrackRef?: string | undefined;
    GPSVersionId?: number[] | undefined;
  };
  interoperability: {
    InteropIndex?: string | undefined;
    InteropVersion?: Buffer | undefined;
  };
  makernote: {
    AutoBracketing?: number | undefined;
    BlurWarning?: number | undefined;
    ExposureWarning?: number | undefined;
    error?: string | undefined;
    FlashExposureComp?: number | undefined;
    FocusMode?: number | undefined;
    FocusWarning?: number | undefined;
    FujiFlashMode?: number | undefined;
    Macro?: number | undefined;
    Quality?: string | undefined;
    Sharpness?: number | undefined;
    SlowSync?: number | undefined;
    Version?: Buffer | undefined;
    WhiteBalance?: number | undefined;
  };
};

export interface IpcRendererFE extends NodeJS.EventEmitter {
  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on<CHANNEL extends SETUP_CHANNEL | MAIN_CHANNEL>(
    channel: CHANNEL,
    listener: CHANNEL extends SETUP_CHANNEL
      ? (event: any, message: messageBus.SETUP_MESSAGE) => void
      : (event: any, message: messageBus.FE_MESSAGES) => void
  ): this;

  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   */
  sendTo(
    webContentsId: number,
    channel: MAIN_CHANNEL,
    message: BE_MESSAGES
  ): void;
}

export interface IpcRendererBE extends NodeJS.EventEmitter {
  // Docs: https://electronjs.org/docs/api/ipc-renderer

  /**
   * Listens to `channel`, when a new message arrives `listener` would be called with
   * `listener(event, args...)`.
   */
  on<CHANNEL extends SETUP_CHANNEL | MAIN_CHANNEL>(
    channel: CHANNEL,
    listener: CHANNEL extends SETUP_CHANNEL
      ? (event: any, message: messageBus.SETUP_MESSAGE) => void
      : (event: any, message: messageBus.BE_MESSAGES) => void
  ): this;

  /**
   * Sends a message to a window with `webContentsId` via `channel`.
   */
  sendTo(
    webContentsId: number,
    channel: MAIN_CHANNEL,
    message: FE_MESSAGES
  ): void;
}

export interface Filters {
  fromDate: number | null;
  toDate: number | null;
  tags: types.Tag[];
}

export type ImageLocation = {
  latitude: number;
  longitude: number;
};

export type Image = {
  hash: string;
  path: string;
  rawPath: string;
  tags: Tag[];
  location: ImageLocation | null;
  creationDate: number; // Epoch timestamp
};

export type ImageWithLocation = {
  hash: string;
  path: string;
  rawPath: string;
  tags: string[];
  location: ImageLocation;
  creationDate: number; // Epoch timestamp
};

export type ImageHashMap = {
  [hash: string]: Image;
};

export interface Progress {
  current: number;
  total: number;
}

export type FrontendRoutes =
  | "START_PAGE"
  | "PRE_PROCESSING_PAGE"
  | "DASHBOARD_PAGE"
  | "SETTINGS_PAGE";

export type Tag =
  | "people"
  | "animals"
  | "vehicles"
  | "food"
  | "drinks"
  | "sports";
