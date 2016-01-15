var tslint = require('gulp-tslint');
var stylish = require('gulp-tslint-stylish');
var gulp = require('gulp');
var options = require('../options');
var util = require('gulp-util');
var tsLintConfig = require(options.paths.config.linter); 
var notify = require('gulp-notify');
var gutil = require('gulp-util');
//=============================================
//            Settings
//=============================================
var LOG = util.log;
var COLORS = util.colors;

//=============================================
// TASKS
//=============================================

/**
 * the 'lint:ts' task runs tslint against app sources 
 * and outputs errors into console
 */
gulp.task('lint:ts', function(cb){
    return lint(options.paths.app.ts)
    .on('error', function(err){
        // cb(err);
    });
});


/**
 * the 'watch:lint:ts' task tracks changes on app sources update and runs 'lint:ts' task  
 *
 */
gulp.task('watch:lint:ts', function(){
    gulp.watch(options.paths.app.ts, function(){
        lint(options.paths.app.ts)
        .on('error', function(err){
            this.emit('end');
        });
    });
})
//=============================================
// FUNCTIONS
//=============================================

function lint(src){
    LOG("linting start");
    var work = [].concat(src);
    return gulp.src(work)
      .pipe(tslint({ configuration: tsLintConfig }))
      .pipe(tslint.report(stylish, {
        summarizeFailureOutput: true,
        emitError: true,
        sort: true,
        bell: true
      }))
      .on("error", notify.onError({
        message: "Error: <%= error.message %>",
        title: "Linting Error",
        wait: false
      }))
      .on("end", function(){
          LOG("linting complete");
      });
}