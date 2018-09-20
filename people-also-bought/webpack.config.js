const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'App.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
