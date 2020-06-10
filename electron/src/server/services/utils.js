// const { getGlobal } = require("electron").remote;
// const throttle=require( "lodash.throttle");
// // import IPC_CHANNELS from "../../shared/ipcChannels";

// /**
//  * Send {senderId: X, type: ACTION.TYPE, payload: {}} to renderer process
//  * @param {messageType} message
//  */
// export const sendToRenderer = (message) => {
//   const rendererWindow = getGlobal("rendererWindow");
//   let {
//     webContents: { id: backgroundWindowId },
//   } = getGlobal("backgroundWindow");

//   rendererWindow.webContents.send(IPC_CHANNELS.MESSAGE_BUS, {
//     ...message,
//     senderId: backgroundWindowId,
//   });
// };

// /**
//  * sendToRenderer throttled wrapper
//  * @param {messageType} message
//  */
// export const sendToRendererThrottled = throttle((message) => {
//   sendToRenderer(message);
// }, 500);
