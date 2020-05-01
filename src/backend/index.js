import { actionToTaskMap } from "./tasks";
import mainQueue from "./queues/mainQueue";

export const triggerAction = (uiAction) => {
  const { name, payload } = uiAction;
  console.log(`P: ${name} : ${JSON.stringify(payload)}`);

  const tasks = actionToTaskMap[name](payload);
  console.log("tasks: ", tasks);
  mainQueue.push(tasks);
};
