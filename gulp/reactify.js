var gulp = require('gulp');
var browserify = require('gulp-browserify');
var _ = require('lodash');
var apps = require('./apps');
var babelify = require("babelify");


_.each(apps, function (app) {
  gulp.task('browserify:' + app, function () {

    return gulp.src('./frontend/' + app + '/main.js')
      .pipe(browserify({
        insertGlobals: true,
        transform: ['babelify'],
        debug: true
      }))
      .on('error', function swallowError(error) {
        console.log(error.toString());
        this.emit('end');
      })
      .pipe(gulp.dest('.tmp/' + app));
  });
});
