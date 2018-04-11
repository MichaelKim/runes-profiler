let path = require('path');
let webpack = require('webpack');

const config = {
  entry: {
    './public/main': './client/index/index.jsx',
    './public/summoner/main': './client/summoner/index.jsx',
    './public/champion/main': './client/champion/index.jsx'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'client')],
        query: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  plugins: [],
  stats: {
    colors: true
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );
} else {
  config.devtool = '#cheap-module-source-map';
}

module.exports = config;
