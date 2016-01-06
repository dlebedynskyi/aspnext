import gulp  from 'gulp';
import paths from '../paths';
import util from 'gulp-util';
import ts from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import typescript  from 'typescript';

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
    var tsProject = ts.createProject(paths.config.tsproj, {
        typescript: typescript
    });

    return gulp.src([paths.app.ts])
         .pipe(sourcemaps.init())
         .pipe(ts(tsProject))
         .pipe(sourcemaps.write('.'))
         .pipe(gulp.dest(paths.build.ts));


    //LOG('Compling: project file '+ COLORS.blue(paths.config.ts));
    //var sourceTsFiles = [path.app.ts, 
    //                     path.config.typings]; //reference to library .d.ts files
    //var tsProject = ts.createProject(paths.config.ts);
    //var tsResult =  gulp.src(sourceTsFiles)
    //                    .pipe(sourcemaps.init())
    //                    .pipe(tsc(tsProject));

    //return tsResult.js
    //    .pipe(sourcemaps.write('.'))
    //    .pipe(gulp.dest(paths.build.ts));                    
});
