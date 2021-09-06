const path = require("path");
const webpackConfig = require("./webpack.config");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = Object.assign(webpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/bookmarklet.html", to: "index.html" }],
    }),
  ],
});
