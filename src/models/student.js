const mongoose =require('mongoose');
const Joi =require('joi');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50,
    },
    student_number:{
        type: String,
        required: true,
        length:6,
        unique:true
    },
    course:{
        type:String,
        required:true,
        minlength: 5,
        maxlength: 100,
    }
});

const Student=mongoose.model('Student',studentSchema);

const validate=student=>{
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        student_number: Joi.string ().length(6).required(),
        course: Joi.string().min(5).max(100).required(),
    });

    return schema.validate(student);

}
const update=student=>{
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        course: Joi.string().min(5).max(100).required(),
    });

    return schema.validate(student);

}

module.exports.Student= Student;
module.exports.validate= validate;
module.exports.update= update;