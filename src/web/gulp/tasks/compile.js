import gulp  from 'gulp';
import paths from '../paths';
import util from 'gulp-util';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import typescript  from 'typescript';
import {isDev, isProduction, isStaging, getEnvironment} from '../options';

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
    LOG('Enviroment is set to ', getEnvironment());
        
    var tsProject = ts.createProject(paths.config.tsproj, {
        typescript: typescript
    });

    return gulp.src([paths.app.ts])
         .pipe(sourcemaps.init())
         .pipe(ts(tsProject))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(paths.build.ts));
});
