const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
    entry:"./src/index.js",
   output: {
       path: path.resolve(__dirname + '/dist'),
       
    },
    mode: "production",
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },

        ]
    },
    plugins: [
           new HtmlWebpackPlugin({
            template: "./src/views/index.html",
            filename:"./index.html"
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW()
    ],
    optimization: {
  minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    
}