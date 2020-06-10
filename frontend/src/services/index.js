// Connection state
const replyHandlers = new Map();
const listeners = new Map();
let messageQueue = [];
let socketClient = null;

/**
 * Initialize the socket connection with the backend
 */
export async function initSocketToServer() {
  const socketName = await window.getServerSocket();
  connectSocket(socketName, () => {
    console.log("Connected!");
  });
}

/**
 * Connect to a given socket
 * @param {string} name
 * @param {function(): any} onOpen
 */
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

/**
 * Send payload to server
 * @param {string} name
 * @param {Object} args
 */
function send(name, args) {
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

/**
 * Trigger project creation in background process
 * Background handlers: electron/src/server/server-handlers
 */
export const createProject = ({ projectRootFolderPath = "" }) => {
  send("create-project", { projectRootFolderPath });
};

export const filterImages = ({ filter }) => {
  send("filter-images", { filter });
};

export const deleteProject = () => {
  send("deleteProject", {});
};

// /**
//  * Trigger project deletion in background process
//  */
// export const deleteProject = () => {
//   sendToBackground({ type: BACKGROUND_ACTIONS.DELETE_PROJECT, payload: null });
// };

// TODONOW: listen on incoming node-ipc

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
