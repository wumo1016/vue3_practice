const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')


function compile() { // 处理scss文件
    return src('./src/*.scss') // 找文件
    .pipe(sass.sync()) // 编译文件
    .pipe(autoprefixer({})) // 添加前缀
    .pipe(cssmin()) // 压缩
    .pipe(dest('./lib')) // 输出
}
function copyfont(){ // 拷贝字体样式
    return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compile,copyfont) // 线性编译 就是依次编译