var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var bundleCSSFile = 'app';

module.exports = {
  entry:{
   './views/app': path.resolve(__dirname,'src/views/app.js'),
    './libs/vendor': ['react', 'react-dom'],
  },
  output:{
      path:path.resolve(__dirname,'build'),
      filename:"[name].js",
      publicPath: 'http://localhost/build'
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
            name: ['./libs/vendor','./libs/manifest'],
       }),
      // 生产环境的打包请取消下面的注释,开发环境保留下面的注释
      // new webpack.DefinePlugin({
      //     'process.env':{
      //         'NODE_ENV': JSON.stringify('production')
      //     }
      // }),
      // new webpack.optimize.UglifyJsPlugin({
      //     compress: {
      //         warnings: false
      //     }
      // })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader!sass-loader'})
      }
    ]
  },
    plugins: [
        new ExtractTextPlugin("resource/css/" + bundleCSSFile + ".css")
    ]
};


