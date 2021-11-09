import initializeProject from "./filter-images";

import db from "../../database";
import imageService from "../../services/image";
import { sendToFrontend } from "../../message-bus";

export default initializeProject({ db, imageService, sendToFrontend });
