var gulp = require('gulp');
var typedoc = require("gulp-typedoc");
var serve = require('gulp-serve');
var options = require('../options');
var notify = require('gulp-notify');

//=========================================
// Configuraiton
//=========================================
var defaultConfig = {
    //TS
    module: "commonjs", 
    target: "es5",
    includeDeclarations: true,
    experimentalDecorators: true,
    // Output options (see typedoc docs) 
    out: options.paths.docs.dest, 
    json: options.paths.docs.jsonDoc,
    readme : options.paths.docs.readme,
    // TypeDoc options (see typedoc docs) 
    name: options.name,
    ignoreCompilerErrors: false,
    version: true,
};
//=========================================
// Tasks
//=========================================
gulp.task('build:docs', function(){
  return buildDocs();
});

gulp.task('serve:docs', ['build:docs'], serve(options.paths.docs.dest));

gulp.task('watch:readme', function(){
    gulp.watch(options.paths.root + '/readme.md', buildDocs);
})


//=========================================
// FUNCTIONS
//=========================================

function buildDocs(){
    var settings = options.extend({}, defaultConfig);
    return gulp
		.src(options.paths.app.ts)
		.pipe(typedoc(settings))
        .pipe(notify("rebuilding docs complete"));
	;
}