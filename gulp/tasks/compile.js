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
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');

//=============================================
//            UTILS FUNCTIONS
//=============================================
var LOG = util.log;
var COLORS = util.colors;
var BEEP  = util.beep;
//=============================================
//                  TASKS
//=============================================
/**
 *compile:ts - complies ts files into js with sourcemaps
 */
gulp.task('compile:ts', ['lint:ts'], function (cb) {  
   compile(cb, paths.app.ts, paths.app.app, false);
});
/**
 *compile:ts - complies all source ts files into js with sourcemap and inlining all angular views and components
 */
gulp.task('compile:inline', function (cb) {
  compile(cb, paths.app.ts, paths.app.app, true);
});
/**
 * compile:tests - compiles all ts with specs into test folder 
 */
gulp.task('compile:tests', function(cb){
     compile(cb, paths.tests.ts, paths.tests.root, true);
});

gulp.task('watch:ts', function () {
    gulp.watch(paths.app.ts, ['compile:dev']);
});


//=============================================
// Functions
//=============================================
function compile(cb, source, output, inlining, noSourceMaps){
    var tsProject = ts.createProject(paths.config.tsproj, {
       typescript: typescript
     });
     
    var src = [].concat(source);
    if (!src.length){
        LOG(COLORS.red('no source specified'));
        cb( new util.PluginError('test', {
            message: 'no source specified'
        }));
        return;
    }
    if (!output){
        LOG(COLORS.red('no output specified'));
        cb( new util.PluginError('test', {
            message: 'no output specified'
        }));
        
        return;
    }
    inlining = !!inlining;
    
    var errored =false;
    var onError = function (err) {
        BEEP();
        errored = true;
        cb(err);
        return "Compilation Errored: " + err.message;
    };

    return gulp.src(src)
         .pipe(plumber({ errorHandler: notify.onError(onError)}))
         .pipe(gulpif(!!noSourceMaps, sourcemaps.init()))
         .pipe(gulpif(inlining, inlineNg2Templates({ 
             base: 'wwwroot',
             target:'es5'
          })))
         .pipe(ts(tsProject))
         .pipe(gulpif(!!noSourceMaps, sourcemaps.write('.')))
         .pipe(gulp.dest(output))
         .on('end', function(){
             if (!errored){
                LOG('compilation complete');
                cb();    
             }  
         });
}
