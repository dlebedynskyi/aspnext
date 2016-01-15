 Table of Content 
 - [Environment](#environment)
 
 - [UI development](#ui-development)
   * [Running Gulp Tasks](#running-gulp-tasks)
   * [Core Tasks](#core-tasks)
   * [Clean](#clean)
   * [Compile App](#compile-app)
   * [Code Quality](#code-quality)
   * [Build for Production](#build-for-production)
   * [Build This Documentation](#build-documentation)
   
 - [Configuration](#configuration)


## ENVIROMENT 

### 1. **Git**  
 Install git command line tools [git](https://git-scm.com/download/win)

### 2. **Node.js** 
Install globally [gulp](https:://gulpjs.com),  [jspm](https://jspm.io), [tsd](https://www.npmjs.com/package/tsd).
 **Run command**    `npm install -g gulp jspm tsd`

### 3. **C#**
	1. Install VS 2015 with latest patches. 
	2. Update to latest RC release of asp.net 5 using dnvm in console `dnvm upgrade`. 
       Version should be '1.0.0-rc1-update1'

## UI DEVELOPMENT

We are using [Typescript](http://www.typescriptlang.org/) and [Angular 2](https://angular.io/). 
For build purposes we are using [Gulp](http://gulpjs.com/) and [SystemJs](https://github.com/systemjs/systemjs) with [JSPM package manager](http://jspm.io/docs/getting-started.html)
### Running Gulp Tasks
Tasks should be run in console via `gulp $$$$$` where $$$$$ is name of command.

### Core Tasks
`gulpfile.js` contains all core tasks. These are some of them:
* _watch:dev_ - runs watch task that monitores typescript and styles files in application folder. task will recompile those on change.
* _compile:dev_ - single run of compilation for typescript and styles files for dev enviroment. Does not bundles or inliness any of source file. Does not rebuilds theme.
* _recompile:dev_ - runs same as compile:dev and cleans all dev folders before run. Refer to _clean:dev_ task
* _compile_ - runs compilation of application and theme files as well. 
* _recompile_ -runs same as _compile_ task  and cleans all  before run. Refer to _'clean' task
* _production_ - cleans compilation file. Rebuilds all styles: theme and app styles. Inlines all app source files, bundles  and minifies into sinle file that is published into destination folder.


### Clean
`clean.js` contains following tasks:
* _clean_ - cleans everything.  Runs _clean:dev, clean:styles, clean:prod, clean:tests_.
* _clean:appstyles_ - task to clean all style files (`*.css` and `*.map.css` ) from source( `app`) folder
* _clean:theme_ - task to clean all compiled theme styles (`*.css` and `*.map.css` ) from 'assets' folder
* _clean:styles_ - cleans compiled styles. Runs _clean:theme_ and _clean:appstyles_ 
* _clean:ts_ - task to clean all dev build files (`*js` and `*.map.js`) from source( `app`) folder
* _clean:dev_ - cleans all compiled files from source folder. Runs _clean:ts_ and _clean:appstyles_ 
* _clean:prod_ - taks to clean all from distrubution folder (`dist`)
* _clean:tests_ - taks to clean all from test folder


### Compile App
*Typescript code compilation is not required during development process.* 
`compile.js` contains following tasks:
* _compile:ts_ - taks to compile all `.ts` files into `.js`. Also generates `map` files. This taks is not required for `Development` code run. Use it only if you suspect that `.ts` issues or to check if application is able to generate correct `.js` from your files. However you might want to run this one to do quality check for your code. Taks will show you all linting and typescript errors found. 
* _watch:ts_ - watch task for typescript files. Will recompile, check linting, report errors for all typescript files on fly.  *Useful for development**
* _compile:inline_ - taks is inlining all Angular 2 components templates and styles and creates `.js` files for them. *Task is essential part of production flow**
* _compile:tests_ - runs compilation of all files into test folder. Part of unit test process.


### Code Quality
App is using [tslint](https://github.com/palantir/tslint) to run checks on code quality of Typescript files.
Best way to check all your `.ts` code is to run _watch:ts_ and fix any errors. 
`linter.js` contains following task: 
* _lint:ts_ - task that peforms single check of `.ts` files and report to console. If errors appear you will also hear bip message
* _watch:lint:ts_ - task that starts a watcher on `.ts` files and runs `lint:ts` on every save of any files. Useful for development.

### Build for Production
Code build and `Production` compilation are performed using [SystemJs Builder](https://github.com/systemjs/builder) with use of `jspm.config.js` (_see below_). 
Source code of builder task is located in `build.js`:
* _build:bundle_ - creating SFX (Static) bundle of application.

App will switch to bundled files based on **ASPNET_ENV** Environment varieble. 
Files included for each environment are configured in `_layout.cshtm` file.  More on this [Asp.net 5 Multiple Envornments](http://docs.asp.net/en/latest/fundamentals/environments.html). 

To test locally you can either change local env varieble or run app using `dnx web-prod` for *Production* or `dnx web-dev` for *Development*. 

Note that for *Production* you will need to build bundles first by running _production_ task. 

Asp.Net publishing tool (_dnu_) will run _production_ task automatically as prepublish step. More on that [Asp.net 5 Deployment](https://leanpub.com/aspnetdeployment/read)
 

### Build Documentation
App can generate help documentation for Typescript files using [TypeDoc](https://typedoc.io). Source code in located in `docs.js`. This files is generated with it's help as well.

* _build:docs_ - rebuilds Typescript documentation
* _serve:docs_ - starts static server that can serve documentation. Typically serves from `localhost:3000`


## CONFIGURATION 
**Asp.net 5 configuration** respects **ASPNET_ENV** Environment varieble
* _project.json_ - ASP specific config
* _appsetttings.json_ - Application config

**Client and build system configuration**
* _project.json_ - npm project. Also holds **jspm** (configuration)[https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm].
* _jspm.config.js_ - (SystemJs configuration file)[https://github.com/systemjs/systemjs/blob/master/docs/config-api.md]. Backbone for all client side.
* _tsconfig.js_ - (Typescript configuration file)[https://github.com/Microsoft/TypeScript/wiki/tsconfig.json]
* _options.js_ - gulp build configuration file. Use this file to configure all paths and defaults build system.
* _tslint.json_ - tslint configuration file. Changes here effects everyone. Don't change unless really know what you are doing.


 









