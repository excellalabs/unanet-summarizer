const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "unanet-summarizer-release.js",
  },
  module: {
    rules: [
      { test: /\.css$/, use: "raw-loader" },
      { test: /\.hbs$/, use: "handlebars-loader" },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
};
