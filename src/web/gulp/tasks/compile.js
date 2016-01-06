import gulp  from 'gulp';
import paths from '../paths';
import util from 'gulp-util';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';

//=============================================
//            UTILS FUNCTIONS
//=============================================
const LOG = util.log;
const COLORS = util.colors;
//=============================================
//                  TASKS
//=============================================
/**
 *compile:src - complies ts files into js and sourcemaps
 */
 
gulp.task('compile:src', ()=>{
    LOG('Compling: project file '+ COLORS.blue(paths.config.ts));
    var tsProject = ts.createProject(paths.config.ts);
    var tsResult =  tsProject.src(paths.app.ts)
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.build.ts));                    
});
