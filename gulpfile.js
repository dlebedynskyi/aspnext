/// <binding ProjectOpened='watch:lint:ts' />
'use strict';

var gulp = require('gulp');
var requireDir =require('require-dir');
var runSequence = require('run-sequence');

//getting all gulp task none reqursive
requireDir('./gulp/tasks', { recurse: true });

gulp.task('watch:dev', ['watch:ts', 'watch:appstyles']);


gulp.task('compile:dev', function(cb){
 runSequence(['compile:ts', 'compile:appstyles'],
              cb);
});

gulp.task('recompile:dev', function(cb){
 runSequence('clean:dev',
             'compile:dev', cb);   
});

gulp.task('compile', function(cb){
 runSequence(['compile:theme', 'compile:dev'],
              cb);   
});

gulp.task('recompile', function(cb){
 runSequence('clean',
             'compile', cb);   
});
                        
gulp.task('production', function(cb){
    runSequence('clean',
                'compile:styles',
                'build:bundle', cb);
});