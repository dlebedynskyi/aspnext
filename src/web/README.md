### Gulp tasks
Tasks should be run in console via `gulp $$$$$` where $$$$$ is name of command

#### Clean
Source code is located in `clean.js` 
* _clean:dev_  - task to clean all dev build files (`*js` and `*.map.js`) from source( `app`) folder
* _clean:prod_ - taks to clean all from distrubution folder (`dist`)
* clean - agregate taks for _clean:dev_ and _clean:prod_

#### Compile
TypeScript code compilation is not required during development process. 
Source code is located in `clean.js` 

* _compile:dev_ - taks to compile all `.ts` files into `.js`. Also generates `map` files. This taks is not required for `Development` code run. Use it only if you suspect that `.ts` issues or to check if application is able to generate correct `.js` from your files
* _compile:inline_ - taks is inlining all Angular 2 components  templates and styles and creates `.js` files for them. Taks is used during `Production` bundling

#### Build and Production 
Code build and `Production` compilation are performed using [SystemJs Builder](https://github.com/systemjs/builder) with use of `jspm.config.js` (_see below_). Source code in located in `build.js`
* _build:bundle_ - creating SFX (Static) bundle of application using [SystemJs SFX Builder](https://github.com/systemjs/builder#self-executing-sfx-bundles)
* `production` - task is running clean app build and bundling using _build:bundle_

App will switch to bundled files based on **ASPNET_ENV** Enviroment varieble. Paths are configured in `_layout.cshtm` file.  More on this [Asp.net 5 Multiple Envornments](http://docs.asp.net/en/latest/fundamentals/environments.html). 
To test locally you can either change local env varieble or run app using `dnx web-prod`. 

#### Documentation 
App can generate help documentation for TypeScript files using [TypeDoc](typedoc.io). Source code in located in `docs.js`. This files is generated with it's help as well.

* _build:docs_ - rebuilds TypeScript documentation
* _serve:docs_ - starts static server that can serve documentation. Typically serves from `localhost:3000`

### Important configuration files 
**Asp.net 5 configuration** respects **ASPNET_ENV** Enviroment varieble
* _project.json_ - ASP specific config
* _appsetttings.json_ - Application config

**Client and build system configuration**
* _project.json_ - npm project. Also holds **jspm** (configuration)[https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm].
* _jspm.config.js_ - (SystemJs configuration file)[https://github.com/systemjs/systemjs/blob/master/docs/config-api.md]. Backbone for all client side.
* _tsconfig.js_ - (TypeScript configuration file)[https://github.com/Microsoft/TypeScript/wiki/tsconfig.json]
* _options.js_ - gulp build configuration file. Use this file to configure all paths and defaults build system.



 








 
