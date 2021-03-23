const path = require('path')

const resolve = paths => path.resolve(__dirname, paths)

const { VueLoaderPlugin } = require('vue-loader') 

module.exports = {
  mode: 'production',
  entry: resolve('../packages/wm-ui/index.ts'),
  output: {
    path: resolve('../lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'wm-ui'
  },
  externals: { // 不打包vue
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue'
    }
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
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}