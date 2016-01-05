'use strict';

import del from 'del';
import gulp from 'gulp';
import util from 'gulp-util';
import path from '../paths';

//=============================================
//            UTILS FUNCTIONS
//=============================================
const LOG = util.log;
const COLORS = util.colors;

//=============================================
//                  TASKS
//=============================================
/**
 * The 'clean' task delete from path.build and  from path.tmp directories.
 * @param {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean', () => {
    const files = [].concat(path.build.basePath, path.tmp.basePath);
    LOG('Cleaning: ' + COLORS.blue(files));
   
    return del(files).then(paths =>{
        LOG('Cleaning complete: ' + COLORS.blue(paths.join('\n')));
    });
});

