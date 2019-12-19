const sass = require("gulp-sass");
const gulp = require("gulp");
// const browser_sync = require('browser-sync');
const concat_css = require('gulp-concat-css');

const compress = {}

compress.css = () => {
    gulp.src(
        'public/scss/*.scss'
    ).pipe(sass())
    .pipe(concat_css('all.css'))
    .pipe(gulp.dest('public/css/'))
    // .pipe(browser_sync.reload({stream: true}))
}

// gulp.task('html', () => {
//      return gulp.src('app/view/*.html')
//             .pipe(browser_sync.reload({stream: true}))
// })
// gulp.task('js', () => {
//     return gulp.src('app/javascript/original/*.js')
//             .pipe(minify({
//                 ext:{
//                     min:'.js'
//                 },
//                 exclude: ['tasks'],
//                 ignoreFiles: ['.combo.js', '.js']
//             }))
//             .pipe(gulp.dest('app/javascript/min'))
//             .pipe(browser_sync.reload({stream: true}))
// })
// gulp.task('watch', () => {
//     gulp.watch('app/stylesheet/scss/', gulp.parallel('scss'))
//     gulp.watch('app/view/*.html', gulp.parallel('html'))
//     gulp.watch('app/javascript/original', gulp.parallel('js'))
// })
// gulp.task('browser-sync', () => {
//     browser_sync.init({
//         server: {
//             baseDir: 'app/',
//             directory: true
//         },
//         open: false,
//         port: 3000
//     })
// })
// gulp.task('run', gulp.parallel('scss', 'browser-sync', 'watch', 'js'))
module.exports = {
    default: compress.css
}