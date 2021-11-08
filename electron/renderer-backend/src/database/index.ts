import dbFactory from "./database";
import isDev from "electron-is-dev";

export type DatabaseType = ReturnType<typeof dbFactory>;

export default dbFactory(isDev);
