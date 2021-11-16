import { sendToFrontend } from "./message-bus"; // initialize the message bus

// setup the FE route
sendToFrontend({ type: "frontend_set-route", payload: "START_PAGE" });
