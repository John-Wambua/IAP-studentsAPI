const express=require('express');
const mongoose=require('mongoose');
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser')
const winston=require('winston')
require('dotenv').config()
const students=require('./routes/students');
const error=require('./middleware/error');

const app=express();
const port =3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/v1/student',students);
app.use(error);

winston.add(new winston.transports.File({filename:'logfile.log'}))
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,});



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})