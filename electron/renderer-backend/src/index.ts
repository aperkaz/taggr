import path from "path";
import os from "os";
import { sendToFrontend } from "./message-bus"; // initialize the message bus

(async () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const sharp = require("sharp");

	const homedir = os.homedir();
	const desktopDir = `${homedir}/Desktop`;

	await sharp({
		create: {
			width: 300,
			height: 200,
			channels: 3,
			noise: {
				type: "gaussian",
				mean: 128,
				sigma: 30,
			},
		},
	}).toFile(path.join(desktopDir, "noise.png"));

	await new Promise((r) => setTimeout(r, 4000));

	sendToFrontend({ type: "frontend-notify", payload: "the BE says HOLA" });
})();
