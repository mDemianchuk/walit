'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const eventStream = require('event-stream');

gulp.task('default', function () {

    let files = [
        './assets/scripts/model/line-chart.js',
        './assets/scripts/model/doughnut-chart.js',
        './assets/scripts/index.js'
    ];

    let tasks = files.map(function (entry) {
        return browserify({entries: [entry]})
            .bundle()
            .pipe(source(entry))
            .pipe(rename({extname: '.bundle.js'}))
            .pipe(gulp.dest('./dist'));
    });

    return eventStream.merge.apply(null, tasks);
});
