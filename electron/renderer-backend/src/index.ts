import shared from "taggr-shared";
import path from "path";

(async () => {
	const sharp = require("sharp");

	const homedir = require("os").homedir();
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
	console.log("HELLO FROMTS-RENDER PROCESS: ", shared);
})();
