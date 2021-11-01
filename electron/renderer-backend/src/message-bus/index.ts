import { messageBus, typeUtils, Types } from "taggr-shared";

const SETUP_CHANNEL = messageBus.CHANNELS.SETUP;
const MAIN_CHANNEL = messageBus.CHANNELS.MAIN;

let feWebContentId: number | undefined;

// setup channel callback
window.ipcRenderer.on(
	SETUP_CHANNEL,
	(event, message: messageBus.SETUP_MESSAGE) => {
		feWebContentId = message.feWebContentId;
		console.log(`[BE] message bus online, feWebContentId: ${feWebContentId}`);
	}
);

// main channel callback
window.ipcRenderer.on(
	MAIN_CHANNEL,
	(event, message?: messageBus.BE_MESSAGES) => {
		if (!message || !message.type.startsWith("backend")) {
			return console.error(
				`[BE] can not process message: ${JSON.stringify(message)}`
			);
		}

		console.log(
			`[BE] receive, type: ${message.type} \npayload: ${JSON.stringify(
				message.payload
			)}`
		);

		switch (message.type) {
			case "backend-notify":
				console.log("BE backend-notify: ", message.payload);
				sendToFrontend({
					type: "frontend-notify",
					payload: "BE reveived the message",
				});
				break;
			default:
				throw new typeUtils.UnreachableCaseError(message.type);
		}
	}
);

export const sendToFrontend = (message: messageBus.FE_MESSAGES): void => {
	if (!feWebContentId || isNaN(feWebContentId))
		throw new Error(
			"[BE] ipc ca not send message, is missing the feWebContentId"
		);

	console.log(
		`[BE] sending, type: ${message.type} \npayload: ${JSON.stringify(
			message.payload
		)}`
	);
	window.ipcRenderer.sendTo(feWebContentId, MAIN_CHANNEL, message);
};
