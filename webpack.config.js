var webpack = require('webpack'),
    path = require('path');

module.exports = {
 devtool: 'inline-source-map',
 entry: './build/main.ts',
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"],

 },
 output: {
   filename: 'voxc.js',
   path: '/build/js/',
    libraryTarget: 'var',
    library: "voxJSCanvas"
 }
};

