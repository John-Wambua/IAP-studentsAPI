const express= require('express');
const helmet =require('helmet');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const students =require( '../routes/students');
const error =require('../middleware/error');


module.exports=app=>{
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(helmet());
    app.use(morgan('tiny'));
    app.use('/api/v1/student',students);
    app.use(error);
}