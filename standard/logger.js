var logger = {};
logger.active = true;

logger.logs = [];

logger.log = function(fn,args){
    if(!logger.active){
        return;
    }    
    var log = {fn:fn,args:args,time:performance.now(),trace:new Error().stack}
    logger.logs.push(log);
    
}