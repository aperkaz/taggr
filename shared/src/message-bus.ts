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

import {
  Filters,
  FrontendRoutes,
  Image,
  ImageWithLocation,
  Progress,
} from "./types";

export type CHANNEL = {
  SETUP: "taggr-ipc-setup";
  MAIN: "taggr-ipc-main";
};

export type SETUP_MESSAGE = {
  feWebContentId: number;
  beWebContentId: number;
};

export const FE_MESSAGE_NAMESPACE = `frontend_`;
export type FE_MESSAGES =
  | {
      type: `${typeof FE_MESSAGE_NAMESPACE}set-route`;
      payload: FrontendRoutes;
    }
  | {
      type: `${typeof FE_MESSAGE_NAMESPACE}set-images`;
      payload: Image[];
    }
  | {
      type: `${typeof FE_MESSAGE_NAMESPACE}set-images-with-location`;
      payload: ImageWithLocation[];
    }
  | {
      type: `${typeof FE_MESSAGE_NAMESPACE}set-progress`;
      payload: Progress;
    };

export const BE_MESSAGE_NAMESPACE = `backend_`;
export type BE_MESSAGES =
  | {
      type: `${typeof BE_MESSAGE_NAMESPACE}initialize-project`;
      payload: string;
    }
  | {
      type: `${typeof BE_MESSAGE_NAMESPACE}filter-images`;
      payload: Filters;
    }
  | {
      type: `${typeof BE_MESSAGE_NAMESPACE}filter-images-with-location`;
      payload: Filters;
    }
  | {
      type: `${typeof BE_MESSAGE_NAMESPACE}reset`;
    }
  | {
      type: `${typeof BE_MESSAGE_NAMESPACE}destroy`;
    };
