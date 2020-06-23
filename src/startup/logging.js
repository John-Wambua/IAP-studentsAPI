const winston =require('winston');

module.exports=()=>{

    winston.exceptions.handle(
        new winston.transports.File({filename:'logs/uncaughtExceptions.log'}),
        new winston.transports.Console({colorize:true,prettyPrint:true})
    );

    winston.add(new winston.transports.File({filename:'logs/logfile.log'}))
}