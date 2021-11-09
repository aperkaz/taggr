import initializeProject from "./initialize-project";

import db from "../../database";
import fileService from "../../services/file";
import imageService from "../../services/image";
import { sendToFrontend } from "../../message-bus";

export default initializeProject({
	db,
	fileService,
	imageService,
	sendToFrontend,
});
