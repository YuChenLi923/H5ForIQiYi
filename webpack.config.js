var webpack = require('webpack');
module.exports = {
  entry:{ 
    main:'./js/index.js', //改这里
    vendor: ['react', 'react-dom'],
  },
  output:{
      'path':'./js',
      filename:"[name].js",
      publicPath: 'http://localhost:8080/js'
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
        }),

  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify-loader'],
      },
    ],
  },
};
