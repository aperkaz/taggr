import { types } from "taggr-shared";

declare global {
	interface Window {
		ipcRenderer: types.IpcRendererBE;
	}
}
