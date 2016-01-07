import util from 'gulp-util';
const enviromentVarieble = 'ASPNET_ENV';
/**
 * Allows to determine enviroment application is running at 
 * isDev - returns true if Enviroment Varieble 'ASPNET_ENV' is set to Development or not found
 * isProduction - returns true is Enviroment Varieble 'ASPNET_ENV' is set to Production
 */
export function getEnvironment(){
    return util.env[enviromentVarieble];
}
export function isDev(){
    return getEnviroment() === 'Development';
}

export function isStaging(){
    return getEnviroment() === 'Staging';
}

export function isProduction(){
    var en = getEnviroment();
    return !en ||  en === 'Production';
}