'use strict';

var gulp = require('gulp'),
  apps = require('./apps'),
  _ = require('lodash'),
  swallowError = require('./swallow-error'),
  sass = require('gulp-sass'),
  inject = require('gulp-inject'),
  autoprefixer = require('gulp-autoprefixer');

_.each(apps, function (app) {



  gulp.task('styles:' + app, [], function () {
    var includePaths = ['.tmp'];

    _.each(apps, function (app) {
      includePaths.push('frontend/' + app + '/');
      includePaths.push('.tmp/' + app + '/');
    });

    return gulp.src('frontend/' + app + '/index.scss')
      .pipe(inject(gulp.src([
        'frontend/' + app + '/**/*.scss',
        '.tmp/' + app + '/**/*.scss'
      ], {read: false}), {
        transform: function (filePath) {
          filePath = filePath.replace(('frontend/' + app + '/').toString(), '');
          filePath = filePath.replace(('.tmp/' + app + '/').toString(), '');
          return '@import \'' + filePath + '\';';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
      }))
      .pipe(sass({
        style: 'expanded',
        includePaths: includePaths
      }))
      .on('error', swallowError)
      .pipe(autoprefixer({
        browsers: ['> 1%', 'last 10 versions', 'Firefox 5', 'Opera 12', 'ie 9'],
        cascade: false
      }))
      .on('error', swallowError)
      .pipe(gulp.dest('.tmp/' + app + '/'));
  });
});