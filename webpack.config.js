// webpack.config.js
  const SassPlugin = require('sass-webpack-plugin');
  const HtmlPlugin = require('html-webpack-plugin');
  const path = require('path');
  const contentBase = path.join(__dirname, 'build');

  module.exports = {
    entry: './src/js/index.js',
    plugins: [
      new SassPlugin('./src/styles/index.scss', process.env.NODE_ENV),
      new HtmlPlugin({
        inject: true,
        filename: 'index.html',
        template: './src/html/invoice.html',
        title: 'Invoice page',
        styles: [{ rel: 'stylesheet', type: 'text/css', href: './index.css' }],
      })
    ],
    module: {
      rules: [{
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            },
            {
              loader: "css-loader" // translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // compiles Sass to CSS
            }
          ],
       }]
    },
    output: {
      path: contentBase,
      filename: 'index.js'
    },
    devServer: (process.env.NODE_ENV === 'production') ? false : {
      contentBase,
      compress: true,
      port: 3000
    },
  };
