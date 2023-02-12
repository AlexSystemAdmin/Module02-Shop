const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
  }
};

module.exports = ({develop}) => ({
  mode: develop ? "development" : "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  plugins: [
    new HtmlWepackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './styles/main.css'
    })
  ],
  module:{
    rules:[
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.css$/i,
        use:[
          MiniCssExtractPlugin.loader, 'css-loader'
        ]
      },
      {
        test: /\.SCSS$/i,
        use:[
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  ...devServer(develop),
});