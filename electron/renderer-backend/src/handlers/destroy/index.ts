import database from "../../database";
import envPaths from "../../env-paths";
import destroy from "./destroy";

export default destroy({ db: database, preprocessImagesPath: envPaths.data });
