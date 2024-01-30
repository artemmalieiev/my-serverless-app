const path = require("path");
const ServerlessWebpack = require("serverless-webpack");
const WebpackNodeExternals = require("webpack-node-externals");

module.exports = {
  entry: ServerlessWebpack.lib.entries,
  output: {
    path: path.join(__dirname, ".webpack"),
    library: {
      type: "commonjs2",
    },
  },
  stats: "errors-only",
  target: "node",
  mode: "production",
  optimization: {
    concatenateModules: false,
    minimize: false,
  },
  performance: {
    hints: false,
  },
  devtool: "source-map",
  externals: [WebpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            compilerOptions: {
              inlineSourceMap: true,
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
};
