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
 * The 'clean' task delete *.js and *.map from target dir
 * @param {Promise}. see https://github.com/sindresorhus/del/releases/tag/v2.0.0
 */
gulp.task('clean:src', () => {
    const files = [].concat(path.clean.ts);
    LOG('Cleaning: ' + COLORS.blue(files));
   
    return del(files).then(paths =>{
        LOG('Cleaning complete: ' + COLORS.blue(paths.join('\n')));
    });
});

