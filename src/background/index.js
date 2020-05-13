const { getGlobal } = require("electron").remote;
export const backgroundLogger = getGlobal("backgroundLogger");
import { loadModel } from "./features/classifyImage";
import "./services";

// load the required models as soon as the background process starts
(async () => {
  await loadModel();
})();

backgroundLogger.log("Background process started");
// TODO: improvement: review logger utility
