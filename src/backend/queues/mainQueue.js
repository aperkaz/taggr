import queue from "async/queue";

// TODONOW: note on architecture, the queues hold the connections to the appStore

export default queue(({ name, payload }, callback) => {
  console.log("main queue processing: ", name);
  // TODONOW: complete
  callback();
});
