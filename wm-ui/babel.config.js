module.exports = {
  presets: [ // 反向执行
    '@babel/preset-env',
    '@babel/preset-typescript'
  ],
  overrides: [{ // 编译vue文件中ts
    test: /\.vue$/,
    plugins: [
      '@babel/transform-typescript'
    ]
  }]
}