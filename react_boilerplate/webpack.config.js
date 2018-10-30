const path = require('path')

// On this object, all the configuration details for webpack build are defined.
// module.exports is a way to expose something to other files.
module.exports = {
  entry: './src/app.jsx',
  output: {
    // ABSOLUTE PATH were the webpack file is output.
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader', // Need this to run the files through babel
      test: /\.jsx$/,  // Test that the file ends with .js
      exclude: /node_modules/ // Exclude the files in node_modules folder
    }, {
      test: /\.(sass|css)$/,
      use: [ // Array of loaders
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}