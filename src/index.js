const express= require('express');
const winston =require('winston');
const app=express();

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()

const port =3000;

app.listen(port,()=>{
    winston.info(`server is running on port ${port}`);
})