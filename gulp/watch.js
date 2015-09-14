'use strict';

var gulp = require('gulp'),
  apps = require('./apps'),
  _ = require('lodash');


_.each(apps, function (app) {
  gulp.task('watch:' + app, ['browserify:' + app, 'styles:' + app], function () {
    //gulp.watch('src/' + app + '/{app,components}/**/*.scss', ['injector:css:watch:' + app]);
    gulp.watch('frontend/' + app + '/**/*.js', ['browserify:' + app]);
    gulp.watch('frontend/' + app + '/**/*.scss', ['styles:' + app]);
  });
});
