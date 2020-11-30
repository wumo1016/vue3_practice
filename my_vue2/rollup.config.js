import ts from 'rollup-plugin-typescript2'
import { nodeResolve }  from '@rollup/plugin-node-resolve'
import replace  from '@rollup/plugin-replace'
import serve from 'rollup-plugin-serve'
import path from 'path'
import livereload from 'rollup-plugin-livereload'

const resolveFile = filePath => path.join(__dirname, filePath)

export default {
  input: 'src/index.ts',
  output: {
    name: 'Vue',
    format: 'umd',
    file: './dist/vue.js',
    sourcemap: true, // 生成引射文件
  },
  plugins: [
    nodeResolve({
      extensions: ['.js','.ts']
    }),
    ts({
      tsconfig: './tsconfig.json'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    serve({
      open: true,
      port: 8003,
      contentBase: ''
    }),
    livereload()
  ]
}
