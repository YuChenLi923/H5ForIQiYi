var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry:{
   './controls/pagination': path.resolve(__dirname,'src/controls/pagination.controls.js'),
   './controls/index':path.resolve(__dirname,'src/controls/index.controls.js'),
   './controls/searchMobile':path.resolve(__dirname,'src/controls/searchMobile.controls.js'),
   './controls/rank':path.resolve(__dirname,'src/controls/rank.controls.js'),
   'index': path.resolve(__dirname,'src/resource/scss/index.scss'),
   'rank': path.resolve(__dirname,'src/resource/scss/rank.scss'),
   'pagination': path.resolve(__dirname,'src/resource/scss/pagination.scss'),
   'searchMobile': path.resolve(__dirname,'src/resource/scss/searchMobile.scss'),
    './libs/vendor': ['react', 'react-dom'],
  },
  output:{
      path:path.resolve(__dirname,'build'),
      filename:"[name].js",
      publicPath: 'http://localhost/'
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
            name: ['./libs/vendor','./libs/manifest'],
       }),
     //生产环境的打包请取消下面的注释,开发环境保留下面的注释
     // new webpack.optimize.UglifyJsPlugin({
     //     compress: {
     //         warnings: false,
     //         drop_console:true
     //     }
     // }),
     //    new webpack.DefinePlugin({
     //        'process.env':{
     //            'NODE_ENV': JSON.stringify('production')
     //        }
     //    }),
      new ExtractTextPlugin("resource/css/[name].css")
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
  }
};
