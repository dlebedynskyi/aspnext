var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var options =require('../options'); 
var paths = options.paths;
var path = require('path');
var jspm = require('gulp-jspm');
var uglify = require('gulp-uglify');
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
    baseURL :  '/wwwroot',
         transpiler: 'babel',
         packages: {
            "app": {
            "main": "bootstrap",
            "defaultExtension": "js"
            }
        }/*,      
        paths: {
          'app/*.js' : 'temp/*.ts'
        }
*/
};
var outputOptions = {
    minify: true,
    inject: true,
    sfx: true,
    sourceMaps: true
};

//=============================================
//                  TASKS
//=============================================


/**
 * The 'build:bundle' compiles and bundles source files into one including all deependencies 
 */
gulp.task('build:bundle', ['clean:prod', 'compile:inline'], function () {
    return build(paths.build.input, paths.build.output, outputOptions);
});

/*
NOT required now 
 The 'build:prod' compiles and minifies files for production
 */
/*
gulp.task('build:minify', ['build:bundle'], function () {
    LOG('Bundling files: ' + COLORS.blue(paths.min.js_src));
    return gulp.src(paths.min.js_src, { base: paths.base})
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(rename({
            dirname :paths.min.dest,
            suffix: ".min",
         }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.min.dest));
})*/


//=============================================
// Function
//=============================================

function getBuilder(config){
  return Promise.resolve(new Builder()).then(function(builder){
      if (config.baseURL){
          builder.config({baseURL: config.baseURL});
      }
      return builder;
  });
}

function configureBuilder(options){
  return function applyConfig(builder){
    LOG('configuring builder for  : ');
    LOG(options);
    builder.config(options);
    return builder;
  }
}

function loadConfigFile(filename){
  return function withBuilder(builder){
    LOG('loading jspm configuration file from : '+ COLORS.blue(filename));
    return builder.loadConfig(filename, null, true)
      .then(function(){ return builder; });
  }
}



function build(inputPath, outputFile, outputOptions, buildConfig){
  var config =  options.extend({}, baseConfig, buildConfig || {});
  
  var initConfig = {};
  if (config.baseURL)
  {
      initConfig.baseURL = config.baseURL;
      delete config.baseURL;
      LOG('setting baseURL at builder initialize'+ COLORS.blue(initConfig.baseURL));
  }
   
  return getBuilder(initConfig)
    .then(loadConfigFile(Package.jspm.configFile))
    .then(configureBuilder(config))
    .then(function(builder){
      if(outputOptions.sfx){
        LOG('building SFX bundle for: '+ COLORS.blue(inputPath));
        delete outputOptions.sfx;
        return builder.buildStatic(inputPath, outputFile, outputOptions);
      }
      LOG('running bundling for : '+ COLORS.blue(inputPath));
      return builder.bundle(inputPath, outputFile, outputOptions);
    }).then(function(result){
        LOG('bundle complete : '+ COLORS.blue(outputFile));
        return result;
    });
}
