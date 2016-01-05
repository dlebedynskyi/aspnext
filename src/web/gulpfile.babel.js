'use strict';

import requireDir from 'require-dir';

//getting all gulp task none reqursive
requireDir('./gulp/tasks', { recurse: true });