import util from 'gulp-util';
const enviromentVarieble = 'ASPNET_ENV';
/**
 * Allows to determine enviroment application is running at 
 * isDev - returns true if Enviroment Varieble 'ASPNET_ENV' is set to Development or not found
 * isProduction - returns true is Enviroment Varieble 'ASPNET_ENV' is set to Production
 */
export default { 
    isDev : isDev,
    isStaging : isStaging,
    isProduction : isProduction
};


function isDev(){
    return !util.env[enviromentVarieble] || util.env[enviromentVarieble] === 'Development';
}

function isStaging(){
    return util.env[enviromentVarieble] === 'Staging';
}

function isProduction(){
    return util.env[enviromentVarieble] === 'Production';
}