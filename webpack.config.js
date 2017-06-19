var path = require('path');
var webpack = require('webpack');
var libraryName = 'FluidImageMask';
var outputFile = 'fluid-image-mask.js';

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    library: libraryName,
    path: path.resolve(__dirname, 'examples/js/'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: []
        },
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: []
};
