import { Types } from "taggr-shared";

declare global {
  interface Window {
    ipcRenderer: Types.IpcRenderer;
  }
}
