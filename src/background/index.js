const { getGlobal } = require("electron").remote;
// export const backgroundLogger = getGlobal("backgroundLogger");
import { loadModel as classifyImageLoadModel } from "./operations/imageRecognition/classification";
// import { loadModel as isImageSexyLoadModel } from "./features/isImageSexy";
import { loadModel as objectRecognitionLoadModel } from "./operations/imageRecognition/objectRecognition";
import "./services";

// load the required models as soon as the background process starts
(() => {
  classifyImageLoadModel();
  // isImageSexyLoadModel();
  objectRecognitionLoadModel();
})();

// backgroundLogger.log("Background process started");
// TODO: improvement: review logger utility
