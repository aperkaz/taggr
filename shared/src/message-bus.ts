/**
 * The Frontend (FE) and Backend (BE) render processes communicate throught IPC.
 *
 * The are two channels
 * - the setup channel: share the webContentIds required by the IPC, defined at runtime
 * - the main channel: a message bus between the FE and BE.
 *
 * Implemented using Electron-IPC, and preload scripts (for injecting the ipcRender object as a global).
 * https://www.electronjs.org/docs/latest/api/ipc-renderer
 */

export const CHANNELS = {
  SETUP: "tagger-ipc-setup",
  MAIN: "tagger-ipc-main",
};

export type SETUP_MESSAGE = {
  feWebContentId: number;
  beWebContentId: number;
};

export type FE_MESSAGES = {
  type: "frontend-notify";
  payload: string;
};

export type BE_MESSAGES =
  | {
      type: "backend-notify";
      payload: string;
    }
  | never;
