var gulp = require('gulp');
var paths = require('../options').paths;
var path = require('path');
var util = require('gulp-util');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var options = require('../options');
var debug = require('gulp-debug');

//=============================================
//            UTILS FUNCTIONS
//=============================================
var LOG = util.log;
var COLORS = util.colors;

//=============================================
//                  TASKS
//=============================================
/**
 *compile:less - complies less files into css and sourcemaps
 */

gulp.task('compile:less', function () {
    LOG('Enviroment is set to ', options.getEnvironment());

    return gulp.src([paths.app.less])
        .pipe(less({
            paths: paths.app.lessIncludes
        }))
        .pipe(sourcemaps.write())
         .pipe(debug({ title: 'less-compile:' }))
         .pipe(gulp.dest(paths.build.less));
});