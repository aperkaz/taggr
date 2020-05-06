var Visualizer = require("webpack-visualizer-plugin");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/mainElectron.js",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
  // Creates a stats.html to inspect bundle size
  // plugins: [new Visualizer()],
};
