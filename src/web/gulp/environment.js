
var util = require('gulp-util');
var enviromentVarieble = 'ASPNET_ENV';

/**
 * Allows to determine enviroment application is running at 
 * isDev - returns true if Enviroment Varieble 'ASPNET_ENV' is set to Development or not found
 * isProduction - returns true is Enviroment Varieble 'ASPNET_ENV' is set to Production
 */

exports.getEnvironment =  getEnvironment;

exports.isDev =  function isDev(){
    return getEnvironment() === 'Development';
}

exports.isStaging = function isStaging(){
    return getEnvironment() === 'Staging';
}

exports.isProduction = function isProduction(){
    var en = getEnvironment();
    return !en ||  en === 'Production';
}

function getEnvironment(){
    return util.env[enviromentVarieble];
}