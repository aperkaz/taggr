module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@marshallofsound/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [{ loader: "babel-loader" }],
  },
  {
    test: /\.(jpe?g|png|gif|svg)$/i,
    loader: "url-loader?name=app/images/[name].[ext]",
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "svg-url-loader",
        options: {
          limit: 10000,
        },
      },
    ],
  },
];
