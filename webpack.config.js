const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

const packageJson = require("./package.json");

const isDev = process.env.NODE_ENV !== "production";
if (isDev) process.env.NODE_ENV = "development";

const plugins = [];

if (isDev) {
  plugins.push(
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
    })
  );
  plugins.push(new NodemonPlugin());
}

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  mode: process.env.NODE_ENV,
  externals: [nodeExternals()],
  devtool: "source-map",
  watch: isDev,
  output: {
    filename: "server.build.js",
    path: path.resolve(__dirname, "./dist"),
    libraryTarget: "commonjs2",
  },
  plugins,
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.tsx?|\.m?js)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
