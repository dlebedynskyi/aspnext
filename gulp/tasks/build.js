var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var options =require('../options'); 
var paths = options.paths;
var path = require('path');
var util = require('gulp-util');
var inlineNg2Templates = require('gulp-inline-ng2-template');
var debug = require('gulp-debug');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var Package = require(paths.root +  '/package.json');

//=============================================
//            Settings
//=============================================
var LOG = util.log;
var COLORS = util.colors;

var baseConfig = {
    transpiler: false,
    packages: {
        "app": {
        "main": "bootstrap",
        "defaultExtension": "js"
        }
    }
};
var defaultOutput = {
   //format: 'global',
   minify: true,
   inject: true,
   //issue https://github.com/angular/angular/issues/6366 in angular2.0.0-beta.1 prevents mangle of files
   mangle: false,
   sourceMaps: false,
   normalize: true,
   config : baseConfig
};

//=============================================
//                  TASKS
//=============================================

/**
 * The 'build:bundle' compiles and bundles source files into one including all deependencies 
 */
gulp.task('build:bundle',['clean:prod', 'compile:inline'], function (cb) {
    build('app', options.paths.build.output)
    .then(function(){cb()})
    .catch(function(err){cb(err)});
    
});

//=============================================
// Function
//=============================================
function build(source, output, outputOptions)
{
    source = source || 'app';
    var relativeBase = path.relative(".", options.paths.base),
        builder = new Builder(relativeBase, Package.jspm.configFile),
        opts = options.extend({}, defaultOutput, outputOptions);
    
    LOG(COLORS.blue("Starting bundling with options "));
    LOG("base url: " + COLORS.blue(relativeBase));
    LOG("System.js base config path used: " + COLORS.blue(Package.jspm.configFile)); 
    LOG("bundling settings:  ", opts);
    LOG(COLORS.blue('bundling started ...'));
        
    return builder.buildStatic(source, output, opts).then(
        function(result){
        if (result){
            LOG("bundling finished : ", COLORS.blue(output));    
        }
        else{
            LOG(COLORS.red('did not recived output. check results at: ') + COLORS.blue(output));
        }
        
        return result;
    });
}
