import { generateImageTags } from "./tag-mapping";

class MachineLearningService {
	generateImageTags = generateImageTags;
}

export type Type = MachineLearningService;

export default new MachineLearningService();
