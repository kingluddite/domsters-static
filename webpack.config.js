const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production'; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: {
        url: true,
        minimize: true,
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    home: './src/js/index.js',
    about: './src/js/about.js',
    photos: './src/js/photos.js',
    live: './src/js/live.js',
    contact: './src/js/contact.js',
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'js/[name].bundle.js',
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              // publicPath: 'img/',
              outputPath: 'images/',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    stats: 'errors-only',
  },
  plugins: [
    new HTMLPlugin({
      title: 'Domsters | Home',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['index'],
      exclude: ['about', 'photos', 'live', 'contact'],
      template: './src/index.html',
    }),
    new HTMLPlugin({
      title: 'Domsters | About',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['about'],
      exclude: ['home', 'photos', 'live', 'contact'],
      filename: 'about.html',
      template: './src/about.html',
    }),
    new HTMLPlugin({
      title: 'Domsters | Photos',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['photos'],
      exclude: ['home', 'about', 'live', 'contact'],
      filename: 'photos.html',
      template: './src/photos.html',
    }),
    new HTMLPlugin({
      title: 'Domsters | Live',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['contact'],
      exclude: ['home', 'about', 'photos', 'contact'],
      filename: 'live.html',
      template: './src/live.html',
    }),
    new HTMLPlugin({
      title: 'Domsters | Contact',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['contact'],
      exclude: ['home', 'about', 'photos', 'live'],
      filename: 'contact.html',
      template: './src/contact.html',
    }),
    new ExtractTextPlugin({
      filename: 'css/bundle.css',
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
