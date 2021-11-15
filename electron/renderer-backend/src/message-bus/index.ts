import { messageBus, utils } from "taggr-shared";
import handlerFactory from "../handlers";
import db from "../database";
import fileService from "../services/file";
import imageService from "../services/image";
import machineLearningService from "../services/machine-learning";

let feWebContentId: number | undefined = 2;

/**
 * Send ipc message directly to the BE.
 */
export const sendToFrontend = (message: messageBus.FE_MESSAGES): void => {
	if (!feWebContentId || isNaN(feWebContentId))
		throw new Error(
			"[BE] ipc can not send message, is missing the feWebContentId"
		);

	console.log(`[BE] sending: ${JSON.stringify(message)}`);
	window.ipcRenderer.sendTo(feWebContentId, "taggr-ipc-main", message);
};

/**
 * Handlers are initialized, by passing down the dependencies.
 */
const handlers = {
	destroy: handlerFactory.destroy({
		db,
		preprocessImagesPath: fileService.getDataDirectory(),
	}),
	filterImages: handlerFactory.filterImages({
		db,
		imageService,
		sendToFrontend,
	}),
	initializeProject: handlerFactory.initializeProject({
		db,
		fileService,
		imageService,
		machineLearningService,
		sendToFrontend,
	}),
	reset: handlerFactory.reset({ db }),
};

// TODONOW: add tests to this

// setup channel callback
window.ipcRenderer.on(
	"taggr-ipc-setup",
	(_event: any, message: messageBus.SETUP_MESSAGE) => {
		feWebContentId = message.feWebContentId;
		console.log(`[BE] message bus online, feWebContentId: ${feWebContentId}`);
	}
);

// main channel callback
window.ipcRenderer.on(
	"taggr-ipc-main",
	async (_event: any, message?: messageBus.BE_MESSAGES) => {
		if (!message || !message.type.startsWith(messageBus.BE_MESSAGE_NAMESPACE)) {
			return console.error(
				`[BE] can not process message: ${JSON.stringify(message)}`
			);
		}

		console.log(`[BE] received:${JSON.stringify(message)}}`);

		// the structure in ../handlers mimics this switch
		switch (message.type) {
			case "backend_destroy":
				await handlers.destroy();
				break;
			case "backend_filter-images":
				handlers.filterImages(message.payload);
				break;
			case "backend_initialize-project":
				await handlers.initializeProject(message.payload);
				break;
			case "backend_reset":
				handlers.reset();
				break;
			default:
				throw new utils.UnreachableCaseError(message);
		}
	}
);

export type sendToFrontendType = typeof sendToFrontend;
