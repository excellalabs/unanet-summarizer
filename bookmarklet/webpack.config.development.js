const path = require("path");
const webpackConfig = require("./webpack.config");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer");

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
    new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
});
