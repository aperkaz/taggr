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
  // Config for react: https://github.com/electron-userland/electron-forge/issues/1537
  {
    test: /\.(js?)$/,
    exclude: /(node_modules|.webpack)/,
    use: "babel-loader",
  },
];
