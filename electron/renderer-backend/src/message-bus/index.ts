import { messageBus, utils, types } from "taggr-shared";
import handlers from "../handlers";

const SETUP_CHANNEL = messageBus.CHANNELS.SETUP;
const MAIN_CHANNEL = messageBus.CHANNELS.MAIN;

let feWebContentId: number | undefined;

// TODONOW: add tests to this

// setup channel callback
window.ipcRenderer.on(
	SETUP_CHANNEL,
	(_event: any, message: messageBus.SETUP_MESSAGE) => {
		feWebContentId = message.feWebContentId;
		console.log(`[BE] message bus online, feWebContentId: ${feWebContentId}`);
	}
);

// main channel callback
window.ipcRenderer.on(
	MAIN_CHANNEL,
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
				const images = await handlers.filterImages();
				sendToFrontend({
					type: "frontend_set-images",
					payload: images,
				});
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

export const sendToFrontend = (message: messageBus.FE_MESSAGES): void => {
	if (!feWebContentId || isNaN(feWebContentId))
		throw new Error(
			"[BE] ipc can not send message, is missing the feWebContentId"
		);

	console.log(`[BE] sending: ${JSON.stringify(message)}`);
	window.ipcRenderer.sendTo(feWebContentId, MAIN_CHANNEL, message);
};
