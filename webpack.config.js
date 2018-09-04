const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  node: {
    fs: 'empty'
  },
  mode: 'development',
  entry: {
    bundle: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    //babel configuration
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        //excludes node modules
        exclude: /node_modules/
      },
      {
        //css-loader handles css, style-loader places css into html
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};

module.exports = config;
