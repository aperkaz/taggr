import { messageBus } from ".";
import { BE_MESSAGES, FE_MESSAGES } from "./message-bus";

type SETUP_CHANNEL = messageBus.CHANNEL["SETUP"];
type MAIN_CHANNEL = messageBus.CHANNEL["MAIN"];

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
  tags: string[]; // TODONOW: add list of tags here
}

export type ImageLocation = {
  latitude: number;
  longitude: number;
} | null;

export type Image = {
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
