const { getGlobal } = require("electron").remote;
// export const backgroundLogger = getGlobal("backgroundLogger");
import { loadModel as classifyImageLoadModel } from "./features/classifyImage";
import { loadModel as isImageSexyLoadModel } from "./features/isImageSexy";
import { loadModel as objectRecognitionLoadModel } from "./features/getImageObjects";
import "./services";

// load the required models as soon as the background process starts
(() => {
  classifyImageLoadModel();
  isImageSexyLoadModel();
  objectRecognitionLoadModel();
})();

// backgroundLogger.log("Background process started");
// TODO: improvement: review logger utility
