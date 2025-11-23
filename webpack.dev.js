const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { merge } = require('webpack-merge');
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  // plugins:[
  //   new HtmlWebpackPlugin({
  //       template: "./src/template.html",
  //   })
  // ],
  // module:{
  //   rules:[
  //       {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"],
  //       },
  //       {
  //         test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //         type: "asset/resource",
  //       }
  //   ]
  // },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
});