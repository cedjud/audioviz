var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.html$/, loader: ["file-loader?name=[name].[ext]", "extract-loader", "html-loader"] },
      { test: /\.(jpg|png)$/, use: [ "file-loader" ] },
      { test: /\.mp3$/, use: [ "file-loader?name=[name].[ext]" ] },
      { test: /\.scss$/,
        use: [{ loader: "style-loader" // creates style nodes from JS strings
        }, { loader: "css-loader" // translates CSS into CommonJS
        }, { loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  }
};
