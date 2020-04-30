import { actionToTaskMap } from "./tasks";
import mainQueue from "./queues/mainQueue";

export const triggerAction = (uiAction) => {
  const { type, payload } = uiAction;
  console.log(`P: ${type} : ${JSON.stringify(payload)}`);

  const tasks = actionToTaskMap[type](payload);
  console.log(tasks);
  mainQueue.push(tasks);
};
