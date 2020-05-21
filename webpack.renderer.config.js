var Visualizer = require("webpack-visualizer-plugin");
const rules = require("./webpack.rules");
const CopyWebpackPlugin = require("copy-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

// Worker loader: https://github.com/webpack-contrib/worker-loader
rules.push({
  test: /\.worker\.js$/,
  use: [
    {
      loader: "worker-loader",
      options: {
        // fix loading issue when app is packaged
        publicPath: " ../",
      },
    },
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  // Fix model imports
  // context: path.join(__dirname, 'your-app'),
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/background/statics/quant_mid", to: "quant_mid" },
    ]),
  ],
  // Creates a stats.html to inspect bundle size
  // plugins: [new Visualizer()],
};
