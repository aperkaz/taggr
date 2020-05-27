// @ts-ignore-next-line
global.fetch = require("node-fetch");
const tf = require("@tensorflow/tfjs");
const mobilenet = require("@tensorflow-models/mobilenet");

const PROBABILITY_THRESHOLD = 0.65;

let net;

export async function loadModel() {
  if (net) return;

  console.time("loadModel mobilenet");
  net = await mobilenet.load();
  console.timeEnd("loadModel mobilenet");
}

/**
 * Generate image classification tags for a given image above a probability threshold
 * @param {ImageData} imageData
 * @returns {Promise<String[]>} tags
 */
export async function classifyImage(imageData) {
  if (!net) await loadModel();

  let pixels = tf.browser.fromPixels(imageData);

  console.time("classify");
  let logits = await net.infer(pixels);
  console.log(await getTopKImagenetClassNumbers(logits));

  // let rawPredictions = await net.classify(pixels);
  console.timeEnd("classify");

  // filter out predictions below threshold
  // let filteredRawPredictions = rawPredictions.filter(
  //   (rawPrediction) => rawPrediction.probability > PROBABILITY_THRESHOLD
  // );

  // console.log(filteredRawPredictions);

  // aggregate results, picking only the first name for each class
  const predictions = [];
  // filteredRawPredictions.forEach((rawPrediction) => {
  //   const tag = rawPrediction.className.split(", ")[0].toLowerCase();
  //   predictions.push(tag);
  // });

  // free memory by cleaning TF-internals and variables
  pixels.dispose();
  pixels = null;
  imageData = null;
  // rawPredictions = null;
  // filteredRawPredictions = null;

  return predictions;
}

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function (resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };

function getTopKImagenetClassNumbers(logits, topK = 5) {
  return __awaiter(this, void 0, void 0, function () {
    var softmax,
      values,
      valuesAndIndices,
      i,
      topkValues,
      topkIndices,
      i,
      topImagenetClassIds,
      i;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          softmax = logits.softmax();
          return [4, softmax.data()];
        case 1:
          values = _a.sent();
          softmax.dispose();
          valuesAndIndices = [];
          for (i = 0; i < values.length; i++) {
            valuesAndIndices.push({ value: values[i], index: i });
          }
          valuesAndIndices.sort(function (a, b) {
            return b.value - a.value;
          });
          topkValues = new Float32Array(topK);
          topkIndices = new Int32Array(topK);
          for (i = 0; i < topK; i++) {
            topkValues[i] = valuesAndIndices[i].value;
            topkIndices[i] = valuesAndIndices[i].index;
          }
          topImagenetClassIds = [];
          for (i = 0; i < topkIndices.length; i++) {
            if (topkValues[i] >= PROBABILITY_THRESHOLD) {
              topImagenetClassIds.push(topkIndices[i]);
            }
          }

          return [2, topImagenetClassIds];
      }
    });
  });
}

// CUSTOM CLASSES FOR SORTING:

// // when
// const night;
// const morning;
// // what
// const dark;
// const bright;
// const vehicle;
// const animal;
// const food;
// const drink;
// const sports;
// // where
// const mountain;
// const waterside ;
// // people
// const happy;
// const sad;
// const surprised;
// const alone;
// const peopleGroup;

/**
 * Identify if image contains animals, by imagenet class numbers
 * @param {number[]} imagenetClassNumbers list of imagenet classification numbers
 * @returns {boolean}
 */
const isAnimal = (imagenetClassNumbers) => {
  return imagenetClassNumbers.some((number) => 0 <= number && number <= 397);
};
