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

  // Image loader: https://github.com/electron-react-boilerplate/electron-react-boilerplate/issues/250
  {
    test: /\.(png|jpe?g|gif)$/i,
    loader: "url-loader",
    options: { publicPath: " ../" },
  },

  // Config for react: https://github.com/electron-userland/electron-forge/issues/1537
  {
    test: /\.(js?)$/,
    exclude: /(node_modules|.webpack)/,
    use: "babel-loader",
  },
];
