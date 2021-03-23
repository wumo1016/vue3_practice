const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = paths => path.resolve(__dirname, paths)

const { VueLoaderPlugin } = require('vue-loader') 

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: resolve('main.ts'),
  output: {
    path: resolve('../websie-dist'),
    filename: 'bundle.js'
  },
  resolve: { // 解析模块 对应的扩展名
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.vue',
    ]
  },
  module: {
    rules: [
      { 
        test: /\.(ts|js)x?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader' // 需要配配置文件
      },
      { 
        test: /\.vue$/, 
        loader: 'vue-loader'
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/, 
        loader: 'url-loader'
      },
      {
        test: /\.(css|scss)$/, 
        use: [
          'style-loader',
          'css-loader',
          'scss-loader'
        ]
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html')
    })
  ]
}