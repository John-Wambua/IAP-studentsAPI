const express= require('express');
const helmet =require('helmet');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean')
const hpp=require('hpp')

const AppError=require('./utils/appError');
const students =require( './routes/students');
const error =require('./middleware/error');

const app=express();

//MIDDLEWARE
app.use(helmet());
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({extended:true}));
//Data sanitization against NoSQL query injection,
app.use(mongoSanitize())

//Data sanitization against XSS
app.use(xss())
//prevent parameter pollution
app.use(hpp())


//ROUTES
app.use('/api/v1/student',students);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can\'t find ${req.originalUrl} on this server!`,404));
})

app.use(error);


module.exports=app;