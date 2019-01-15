const {
    src,
    dest,
    series,
    watch
} = require('gulp');
const pug = require('gulp-pug');
var del = require('del');

function clean () {
    return del(['public/build']);
}

function html() {
    return src('views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(dest('public/build/html'))
}

function devhtml() {
    watch('views', parallel(html));
}

exports.clean = clean;
exports.html = html;
exports.devhtml = devhtml;
exports.default = series(clean, html);