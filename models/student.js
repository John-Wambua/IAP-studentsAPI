const mongoose =require('mongoose');
const validator=require('validator');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:6,
        maxlength:50,
    },
    student_number:{
        type: String,
        required: true,
        length:6,
        unique:true,
        validate:[validator.isNumeric,'A student number should contain only numbers']

    },
    course:{
        type:String,
        required:true,
       enum:['Computer Science','Law','BBIT','BTC','Financial Engineering','Financial Economics','Actuarial Science']

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

});

const Student=mongoose.model('Student',studentSchema);

module.exports=Student
