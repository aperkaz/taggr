import dbFactory from "./database";
import isDev from "electron-is-dev";

export type Type = ReturnType<typeof dbFactory>;

export default dbFactory(isDev);
