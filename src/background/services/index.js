import { ipcRenderer } from "electron";
import IPC_CHANNELS from "../../shared/ipcChannels";
import FLOWS from "../flows";
import createProject from "../flows/createProject";
import deleteProject from "../flows/deleteProject";
import searchImages from "../flows/searchImages";
import { backgroundLogger } from "../index";
import "../types";

/**
 * Listener for the IPC messages
 */
ipcRenderer.on(IPC_CHANNELS.MESSAGE_BUS, async (event, message) => {
  const { senderId, type, payload } = message;

  backgroundLogger.log(
    `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type} | payload: ${payload}`
  );

  switch (type) {
    case FLOWS.CREATE_PROJECT:
      await createProject(payload);
      break;
    case FLOWS.DELETE_PROJECT:
      deleteProject();
      break;
    case FLOWS.SEARCH_IMAGES:
      await searchImages(payload);
      break;
    default:
      console.log("background ACTION not found: ");
  }
});

// TODO: improvement: add queue with interrupt for flows
