import server from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: './src/index.js',
  output: {
    file: './public/index.js',
    format: 'umd',
    name: 'Vue'
  },
  watch: {
    include: ['src/**'],
  },
  plugins: [
    server({
      port: '1016',
      contentBase: './public/', // 文件入口位置
    }),
    livereload(),
  ]
}
