import { ipcRenderer } from "electron";
import IPC_CHANNELS from "../../shared/ipcChannels";
import FLOWS from "../flows";
import CreateProject from "../flows/createProject";
import deleteProject from "../flows/deleteProject";
import searchImages from "../flows/searchImages";
// import { backgroundLogger } from "../index";
import "../types";
import { addFlow, deleteFlows } from "../store";

const createProject = new CreateProject();

/**
 * Listener for the IPC messages
 */
ipcRenderer.on(IPC_CHANNELS.MESSAGE_BUS, async (event, message) => {
  const { senderId, type, payload } = message;

  // console.log(
  //   `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type} | payload: ${payload}`
  // );

  switch (type) {
    case FLOWS.CREATE_PROJECT:
      addFlow(createProject);
      await createProject.process(payload);
      deleteFlows();
      break;
    case FLOWS.DELETE_PROJECT:
      await deleteProject();
      break;
    case FLOWS.SEARCH_IMAGES:
      await searchImages(payload);
      break;
    default:
      console.log("background ACTION not found: ");
  }
});

// TODO: improvement: add queue with interrupt for flows
