const app=require('./app');
const mongoose =require( 'mongoose');
require('dotenv').config()

    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex: true,
        },err=>{
        if (err) return console.log('Database connection failed',err)
            console.log('Database Connection successful');
        });

const port =process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}...`);
})