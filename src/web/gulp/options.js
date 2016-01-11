/* global __dirname */
'use strict';
var environment = require('./environment');
var project = require('../project.json');
var path =  require('path');
var appSetting = require('../appsettings.json');

var root = path.dirname(__dirname),
      base = path.join(root, project.webroot || 'wwwroot');

var paths = {
    root : root, 
    base: base,
    app : {
        app: base + '/app/',
        basePath : base + '/app',
        ts: base + '/app/**/*.ts',
        less: path.join(root, 'Less', 'app.less'),
        lessIncludes: [path.join(root, 'Less', 'includes')]
    },
    clean : {
        ts: [base + '/app/**/*.js', base + '/app/**/*.map'],
        dest: [base + "/dist/**/*"]
    },
    build: {
        input : 'app',
        dest: base + "/dist/",
        less: path.join(base, 'app', 'css'),
        output: base + '/dist/app.min.sfx.js'
    },
    config : {
        tsproj: base + '/tsconfig.json'
    },
    docs :{
        dest : './docs',
        jsonDoc : './docs/docs.json',
        readme : root+"/README.md"
    }
};

exports.name = appSetting.name || "web";
exports.environment = environment;
exports.paths = paths;
exports.extend = extend;


function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}

    //root: root,
    ///**
    // * The 'gulpfile' file is where our run tasks are hold.
    // */
    //gulpfile:   [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],
    ///**
    // * This is a collection of file patterns that refer to our app code (the
    // * stuff in `src/`). These file paths are used in the configuration of
    // * build tasks.
    // *
    // * - 'styles'       contains all project css styles
    // * - 'images'       contains all project images
    // * - 'fonts'        contains all project fonts
    // * - 'scripts'      contains all project javascript except config-env.js and unit test files
    // * - 'html'         contains main html files
    // * - 'templates'    contains all project html templates
    // * - 'config'       contains Angular app config files
    // */
    //app: {
    //    basePath:       `${root}/src/`,
    //    fonts:          [`${root}/src/fonts/**/*.{eot,svg,ttf,woff,woff2}`, `${root}/jspm_packages/**/*.{eot,svg,ttf,woff,woff2}`],
    //    styles:         `${root}/src/styles/**/*.scss`,
    //    images:         `${root}/src/images/**/*.{png,gif,jpg,jpeg}`,
    //    config: {
    //        basePath:   `${root}/src/app/core/config/`,
    //        conditions: `${root}/src/app/core/config/env.conditions.js`
    //    },
    //    scripts:        [`${root}/src/app/**/*.js`],
    //    html:           `${root}/src/index.html`,
    //    templates:      `${root}/src/app/**/*.html`,
    //    json:           `${root}/src/app/**/*.json`
    //},
    ///**
    // * This is a collection of file patterns that refer to our app unit and e2e tests code.
    // *
    // * 'config'       contains karma and protractor config files
    // * 'testReports'  contains unit and e2e test reports
    // * 'unit'         contains all project unit test code
    // * 'e2e'          contains all project e2e test code
    // */
    //test: {
    //    basePath:       `${root}/test/`,
    //    config: {
    //        karma:      `${root}/karma.conf.js`,
    //        protractor: `${root}/protractor.conf.js`
    //    },
    //    testReports: {
    //        basePath:   `${root}/test-reports/`,
    //        coverage:   `${root}/test-reports/coverage/`
    //    },
    //    platoReports:   `${root}/test/plato`,
    //    mock:           `${root}/src/app/**/*.mock.js`,
    //    unit:           `${root}/src/app/**/*.spec.js`,
    //    e2e:            `[${root}/test/e2e/**/*.e2e.js, ${root}/src/app/**/*.e2e.js]`
    //},
    ///**
    // * The 'tmp' folder is where our html templates are compiled to JavaScript during
    // * the build process and then they are concatenating with all other js files and
    // * copy to 'dist' folder.
    // */
    //tmp: {
    //    basePath:       `${root}/.tmp/`,
    //    styles:         `${root}/.tmp/styles/`,
    //    scripts:        `${root}/.tmp/scripts/`
    //},
    ///**
    // * The 'build' folder is where our app resides once it's
    // * completely built.
    // *
    // * - 'dist'         application distribution source code
    // * - 'docs'         application documentation
    // */
    //build: {
    //    basePath:       `${root}/wwwroot/`,
    //    dist: {
    //        basePath:   `${root}/wwwroot/dist/`,
    //        fonts:      `${root}/wwwroot/dist/fonts/`,
    //        images:     `${root}/wwwroot/dist/images/`,
    //        styles:     `${root}/wwwroot/dist/styles/`,
    //        scripts:    `${root}/wwwroot/dist/scripts/`
    //    },
    //    docs:           `${root}/wwwroot/docs/`,
    //    testReports:    `${root}/wwwroot/test-reports/`
    //}

