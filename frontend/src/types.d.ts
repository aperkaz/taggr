import { sharedTypes } from "taggr-shared";

declare global {
  interface Window {
    ipcRenderer: sharedTypes.IpcRenderer;
  }
}
