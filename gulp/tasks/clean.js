'use strict';

var del = require('del');
var gulp = require('gulp');
var util = require('gulp-util');
var options = require('../options').paths;

//=============================================
//            UTILS FUNCTIONS
//=============================================
var LOG = util.log;
var COLORS = util.colors;

//=============================================
//                  TASKS
//=============================================
/**
 * The 'clean' taks is cleaning all compilation files
 */
gulp.task('clean', ['clean:dev','clean:styles', 'clean:prod', 'clean:tests']);

/**
 * The 'clean:dev' cleans up source folder. runs 'clean:dev' and 'clean:appstyles'
 */
gulp.task('clean:dev', ['clean:appstyles', 'clean:ts']);

/**
 * The 'clean:styles' runs 'lean:theme' and 'clean:appstyles'
 */
gulp.task('clean:styles', ['clean:appstyles', 'clean:theme']);

/**
 * The 'clean:dev' task delete *.js and *.map from app 
 * @return {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean:ts', function(){
     return clean(options.clean.ts);
});

/**
 * The 'clean:appstyles' task delete *css and *.css.map files from app
 */
gulp.task('clean:appstyles', function(){
    return clean(options.clean.appstyles);
});

/**  
 * The 'clean:theme' task delete *css and *.css.map files from assets folder
 */
gulp.task('clean:theme', function(){
    return clean(options.clean.theme);
});

/**
 * The 'clean:tests' task delete content of test directory 
 * @return {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean:tests', function(){
     return clean(options.clean.test);
});

/**
 * The 'clean:prod' task delete 'dist' folder
 * @return {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean:prod', function () {
   return clean(options.clean.dest); 
});

//=============================================
// Function
//=============================================

function clean(){
    var sources = [].slice.call(arguments, 0);
    var files  = sources.reduce(function(p,c,i, r){return p.concat(c); }, []);
    LOG('Cleaning: ' + COLORS.blue(files));

    return del(files).then(function (paths) {
        LOG('Cleaning complete: ' + COLORS.blue(paths.join('\n')));
    });
}


