// @ts-nocheck

const MIN_SCORE = 0.5;

let net;

// initialize model
loadModel();

async function loadModel() {
	const cocoSsd = require("@tensorflow-models/coco-ssd");

	console.time("loadModel object recognition");
	net = await cocoSsd.load();
	console.timeEnd("loadModel object recognition");
}

/**
 * Get coco-ssd class ids for an image
 * Returns array with coco-ssd class names
 */
export const getObjectRecognitionClassNames = async (
	img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): Promise<string[]> => {
	if (!net) await loadModel();

	let cocoSsdClassNames = [];

	try {
		let predictions = await net.detect(img);

		predictions.forEach((prediction) => {
			const score = prediction.score;
			const predictedClass = prediction.class;
			if (score > MIN_SCORE) {
				cocoSsdClassNames.push(predictedClass);
			}
		});
	} catch (e) {
		console.error(e);
	}

	return cocoSsdClassNames;
};
