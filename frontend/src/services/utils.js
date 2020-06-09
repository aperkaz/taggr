// import IPC_CHANNELS from "../../shared/ipcChannels";

// /**
//  * Send message to background process through IPC.
//  * @param {messageType} message
//  */
// export const sendToBackground = (message) => {
//   const { getGlobal } = require("electron").remote;
//   const backgroundWindow = getGlobal("backgroundWindow");
//   let {
//     webContents: { id: rendererWindowId },
//   } = getGlobal("rendererWindow");

//   backgroundWindow.webContents.send(IPC_CHANNELS.MESSAGE_BUS, {
//     ...message,
//     senderId: rendererWindowId,
//   });
// };
