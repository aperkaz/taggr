// TODONOW: rewrite to use node-ipc

// Init
export async function init() {
  const socketName = await window.getServerSocket();
  connectSocket(socketName, () => {
    console.log("Connected!");
  });
}

// State
const replyHandlers = new Map();
const listeners = new Map();
let messageQueue = [];
let socketClient = null;

// Functions
function connectSocket(name, onOpen) {
  window.ipcConnect(name, function (client) {
    client.on("message", (data) => {
      const msg = JSON.parse(data);

      if (msg.type === "error") {
        // Up to you whether or not to care about the error
        const { id } = msg;
        replyHandlers.delete(id);
      } else if (msg.type === "reply") {
        const { id, result } = msg;

        const handler = replyHandlers.get(id);
        if (handler) {
          replyHandlers.delete(id);
          handler.resolve(result);
        }
      } else if (msg.type === "push") {
        const { name, args } = msg;

        const listens = listeners.get(name);
        if (listens) {
          listens.forEach((listener) => {
            listener(args);
          });
        }
      } else {
        throw new Error("Unknown message type: " + JSON.stringify(msg));
      }
    });

    client.on("connect", () => {
      socketClient = client;

      // Send any messages that were queued while closed
      if (messageQueue.length > 0) {
        messageQueue.forEach((msg) => client.emit("message", msg));
        messageQueue = [];
      }

      onOpen();
    });

    client.on("disconnect", () => {
      socketClient = null;
    });
  });
}

export function send(name, args) {
  return new Promise((resolve, reject) => {
    let id = window.uuid.v4();
    replyHandlers.set(id, { resolve, reject });
    if (socketClient) {
      socketClient.emit("message", JSON.stringify({ id, name, args }));
    } else {
      messageQueue.push(JSON.stringify({ id, name, args }));
    }
  });
}

export function listen(name, cb) {
  if (!listeners.get(name)) {
    listeners.set(name, []);
  }
  listeners.get(name).push(cb);

  return () => {
    let arr = listeners.get(name);
    listeners.set(
      name,
      arr.filter((cb_) => cb_ !== cb)
    );
  };
}

export function unlisten(name) {
  listeners.set(name, []);
}

// const { ipcRenderer } = require("electron");

// import IPC_CHANNELS from "../../shared/ipcChannels";
// import { BACKGROUND_ACTIONS } from "../../shared/actions";

// import store, { ACTIONS } from "../store";
// import { sendToBackground } from "./utils";

// /**
//  * Trigger project creation in background process
//  * @param {String} folderPath root folder path for the project
//  */
// export const createProject = (folderPath) => {
//   sendToBackground({
//     type: BACKGROUND_ACTIONS.CREATE_PROJECT,
//     payload: folderPath,
//   });
// };

// /**
//  * Trigger project deletion in background process
//  */
// export const deleteProject = () => {
//   sendToBackground({ type: BACKGROUND_ACTIONS.DELETE_PROJECT, payload: null });
// };

// /**
//  * Trigger image search in background process
//  * @param {String[]} tagValues
//  */
// export const searchImages = (tagValues) => {
//   sendToBackground({
//     type: BACKGROUND_ACTIONS.SEARCH_IMAGES,
//     payload: tagValues,
//   });
// };

// // Listener for incomming IPC messages
// ipcRenderer.on(
//   IPC_CHANNELS.MESSAGE_BUS,
//   (event, { senderId, type, payload }) => {
//     // console.log(
//     //   `IPC: ${IPC_CHANNELS.MESSAGE_BUS} | from ${senderId} | type: ${type}`
//     // );

//     switch (type) {
//       case ACTIONS.setImages.type:
//         store.dispatch(ACTIONS.setImages(payload));
//         break;
//       case ACTIONS.setImagesWithLocation.type:
//         store.dispatch(ACTIONS.setImagesWithLocation(payload));
//         break;
//       case ACTIONS.setTask.type:
//         store.dispatch(ACTIONS.setTask(payload));
//         break;
//       case ACTIONS.setTags.type:
//         store.dispatch(ACTIONS.setTags(payload));
//         break;
//       case ACTIONS.resetState.type:
//         store.dispatch(ACTIONS.resetState());
//         break;
//       default:
//     }
//   }
// );

// // TODO: clean up module dependency and simplify service layer
// // TODO: improvement: rethink the dependencies betweem processes and service layer.
