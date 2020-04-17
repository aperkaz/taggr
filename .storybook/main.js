module.exports = {
  stories: ["../stories/**/*.stories.js"],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        rules: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: /dist/, //Include dist folder as well to parse using babel loader in order to resolve exports not defined error
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // Allow commonjs imports in storybook
                    modules: "commonjs",
                  },
                ],
              ],
            },
          },
        ],
      },
    };
  },
};
