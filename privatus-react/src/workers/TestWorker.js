const workercode = () => {
  self.onmessage = function (e) {
    console.log("Message received from main script");
    var workerResult = "Received from main: " + e.data;
    console.log("Posting message back to main script");
    self.postMessage(workerResult);
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const TestWorker = URL.createObjectURL(blob);

module.exports = TestWorkerScript;
