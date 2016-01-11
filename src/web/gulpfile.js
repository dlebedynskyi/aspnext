'use strict';

var requireDir =require('require-dir');

//getting all gulp task none reqursive
requireDir('./gulp/tasks', { recurse: true });