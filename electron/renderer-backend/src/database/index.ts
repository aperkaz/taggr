import { IS_DEV } from "taggr-shared";
import dbFactory from "./database";

export type Type = ReturnType<typeof dbFactory>;

export default dbFactory(IS_DEV);
