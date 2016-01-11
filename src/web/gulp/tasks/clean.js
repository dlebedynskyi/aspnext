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
gulp.task('clean', ['clean:dev', 'clean:prod']);

/**
 * The 'clean:dev' task delete *.js and *.map = require(target dir
 * @return {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean:dev', function(){
     return clean(options.clean.ts);
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

function clean(input){
    var files = [].concat(input);
    LOG('Cleaning: ' + COLORS.blue(files));

    return del(files).then(function (paths) {
        LOG('Cleaning complete: ' + COLORS.blue(paths.join('\n')));
    });
}


