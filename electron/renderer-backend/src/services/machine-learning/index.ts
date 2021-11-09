import { generateImageTags } from "./custom-tags";

class MachineLearningService {
	generateImageTags = generateImageTags;
}

export type Type = MachineLearningService;

export default new MachineLearningService();
