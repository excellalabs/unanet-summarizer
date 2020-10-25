const webpackConfig = require("./webpack.config");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = Object.assign(webpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    inline: false,
    open: "Google Chrome",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/bookmarklet.html", to: "index.html" }],
    }),
  ],
});
