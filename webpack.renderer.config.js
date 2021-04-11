const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  externals: {
    sharp: "commonjs sharp",
    "@tensorflow/tfjs-node": "commonjs @tensorflow/tfjs-node",
  },
};
