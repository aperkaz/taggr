const path = require("path");
const rules = require("./webpack.rules");

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
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components/"),
      store: path.resolve(__dirname, "src/store/"),
      workers: path.resolve(__dirname, "src/workers/"),
    },
  },
};
