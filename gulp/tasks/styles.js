var gulp = require('gulp');
var options = require('../options');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var options = require('../options');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

//=============================================
//            UTILS FUNCTIONS
//=============================================
var LOG = util.log;
var COLORS = util.colors;

//=============================================
//                  TASKS
//=============================================
/**
 *The `compile:theme` - complies scss theme files into css and sourcemaps with minification
 */
gulp.task('compile:theme', function () {
    return compile(options.paths.styles.theme.src, 
                   options.paths.styles.theme.dest, 
                   true, true);
});

/**
 *The `compile:appstyles` - complies scss  app files into css and sourcemaps
 */
gulp.task('compile:appstyles', function () {
    return compile(options.paths.styles.app.src, 
                   function(file) {
                        return file.base;
                    }, 
                  true, false);
});

/**
 * The `compile:styles` - compiles them and app style files 
 */
gulp.task('compile:styles', ['compile:theme', 'compile:appstyles']);


gulp.task('watch:appstyles', function () {
    gulp.watch(options.paths.styles.app.src, ['compile:appstyles']);
});

//=============================================
// FUNCTIONS
//=============================================

function compile(src, dest, withSourcemap, minimized){
    withSourcemap =  typeof(withSourcemap) !== 'undefined' ? !!withSourcemap : true; 
    minimized = typeof(minimized) !== 'undefined' ? !!minimized : false;
    
    src = [].concat(src);
    
    return gulp.src(src)
         .pipe(gulpif(withSourcemap,  sourcemaps.init()))
         .pipe(sass())
         .pipe(gulpif(minimized, cssnano()))
         .pipe(gulpif(minimized, rename({suffix : ".min"})))
         .pipe(gulpif(withSourcemap, sourcemaps.write('.')))
         .pipe(gulp.dest(dest));
    
}