var gulp = require('gulp');
var paths = require('../options').paths;
var util = require('gulp-util');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('typescript');
var options = require('../options');
var debug = require('gulp-debug');
var inlineNg2Templates = require('gulp-inline-ng2-template');
//=============================================
//            UTILS FUNCTIONS
//=============================================
var LOG = util.log;
var COLORS = util.colors;

//=============================================
//                  TASKS
//=============================================
/**
 *compile:ts - complies ts files into js and sourcemaps
 */

gulp.task('compile:dev', function () {
    var tsProject = ts.createProject(paths.config.tsproj, {
        typescript: typescript
    });

    return gulp.src([paths.app.ts])
         .pipe(plumber())
         .pipe(sourcemaps.init())
         .pipe(ts(tsProject))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(paths.app.app));
});

gulp.task('compile:inline', function () {
    var tsProject = ts.createProject(paths.config.tsproj, {
        typescript: typescript
    });

    return gulp.src([paths.app.ts])
         .pipe(plumber())
         .pipe(sourcemaps.init())
         .pipe(inlineNg2Templates({ 
             base: 'wwwroot',
             target:'es5'
          }))
         .pipe(ts(tsProject))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(paths.app.app));
});


gulp.task('watch:ts', function () {
    gulp.watch([paths.app.ts], ['compile:dev']);
});

