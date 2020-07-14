const express= require('express');
const helmet =require('helmet');
const morgan =require('morgan');
const bodyParser =require('body-parser');

const AppError=require('./utils/appError');
const students =require( './routes/students');
const error =require('./middleware/error');

const app=express();

//MIDDLEWARE
if (process.env.NODE_ENV==='development'){
    app.use(morgan('tiny'));
}
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());


//ROUTES
app.use('/api/v1/student',students);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can\'t find ${req.originalUrl} on this server!`,404));
})

app.use(error);


module.exports=app;