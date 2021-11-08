import dbFactory from "./factory";
import isDev from "electron-is-dev";

export default dbFactory(isDev);
