import destroy from "./destroy";
import database from "../../database";
import fileService from "../../services/file";

export default destroy({
	db: database,
	preprocessImagesPath: fileService.getDataDirectory(),
});
