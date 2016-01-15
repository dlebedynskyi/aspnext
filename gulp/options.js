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
        ts: [base + '/app/**/*.ts']
    },
    clean : {
        ts: [base + '/app/**/*.js', base + '/app/**/*.js.map'],
        appstyles : [base + '/app/**/*.css', base + '/app/**/*.css.map'],
        theme : [base + "/assets/**/*.css", base + "/assets/**/*.css.map"],
        dest: [base + "/dist/"],
        test : [root  + "/test/"]
    },
    build: {
        input : 'app',
        dest: base + "/dist/",
        output: base + '/dist/app.min.sfx.js'
    },
    config : {
        tsproj: base + '/tsconfig.json',
        linter : root + '/tslint.json',
        karma : root + '/karma.conf.js'
    },
    styles : {
      theme  : {
          src : [root  + "/scss/*.scss"],
          dest : base + "/assets/"
      },
      app : {
          src  : [base + '/app/**/*.scss']
      }
    },
    tests : {
      ts : [base + '/app/**/*.ts', '!' +base + '/app/bootstrap.ts'],
      root : root + "/test"  
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
