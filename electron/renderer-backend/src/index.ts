import shared from "taggr-shared";

(async () => {
	const sharp = require("sharp");
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
	}).toFile("noise.png");
	console.log("HELLO FROMTS-RENDER PROCESS: ", shared);
})();
