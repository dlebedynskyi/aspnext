var gulp = require('gulp');
var karma = require('karma');
var options = require('../options');
var runSequence = require('run-sequence');

gulp.task('karma:server', function(cb){
    new karma.Server({
        configFile: options.paths.config.karma,
         singleRun: true
    }).start(cb);
});


gulp.task('test', function(cb){
    runSequence('clean:tests',
                'compile:tests',
                'karma:server',
                cb);
})