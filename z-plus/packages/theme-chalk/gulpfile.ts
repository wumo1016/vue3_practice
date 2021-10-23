// 串行和并行
import { series, src, dest } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import path from 'path'

// 打包样式
function compile() {
  const sass = gulpSass(dartSass)
  return src(path.resolve(__dirname, './src/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cleanCss()) // 压缩文件
    .pipe(dest('./dist/css'))
}
// 复制字体文件
function copyFont() {
  return src(path.resolve(__dirname, './src/fonts/**'))
    .pipe(cleanCss())
    .pipe(dest('./dist/fonts'))
}
// 将所有样式文件复制到根目录中去
function copyStyle() {
  return src(path.resolve(__dirname, './dist/**')).pipe(
    dest(path.resolve(__dirname, '../../dist/theme-chalk/style'))
  )
}

export default series(compile, copyFont, copyStyle)

// 打包样式需要的包
// pnpm install sass @types/sass gulp-sass @types/gulp-sass gulp-autoprefixer @types/gulp-autoprefixer gulp-clean-css @types/gulp-clean-css -D -w
