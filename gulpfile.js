const { src, dest, series, watch ,parallel} = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
var del = require('del')

function clean() {
	return del(['public/build'])
}

// function html() {
// 	return src('views/*.pug')
// 		.pipe(
// 			pug({
// 				pretty: true
// 			})
// 		)
// 		.pipe(dest('public/build/html'))
// }

// function devhtml() {
// 	watch('views', parallel(html))
// }

function css() {
    return src('src/scss/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('public/build/css'))
}

function dev() {
    watch('src/scss', parallel(css));
}


exports.clean = clean
// exports.html = html
// exports.devhtml = devhtml
// exports.default = series(clean, html)
exports.default = parallel(dev)

