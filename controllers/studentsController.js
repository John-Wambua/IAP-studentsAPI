const Student=require('../models/student')
const AppError=require('../utils/appError')
const catchAsync=require('../utils/catchAsync')
const _=require('lodash');


const filterObj=(obj,...allowedFields)=>{
    // {name:req.body.name,email:req.body.email}
    const newObj={};
    Object.keys(obj).forEach(el=>{
        if (allowedFields.includes(el)) newObj[el]=obj[el];
    });
    return newObj;
}

exports.getAllStudents=catchAsync(async (req,res,next)=>{

    const students=await Student.find();
        res.status(200).json({
            status:'success',
            results:students.length,
            data:{
                students:_.map(students, _.partialRight(_.pick, ['student_number','_id','name','course','createdAt']))
            }
        })
})

exports.addStudent=catchAsync(async (req,res,next)=>{

    const student=await Student.create(req.body);
    res.status(200).json({
        status:'success',
        data:{
            student:_.pick(student,['student_number','_id','name','course','createdAt'])
        }
    })
})
exports.getSingleStudent=catchAsync(async (req,res,next)=>{
    const studentNumber=req.params.id;
    let isnum = /^\d+$/.test(studentNumber);

    if (studentNumber.length!=6||!isnum) return next(new AppError(new Error('Invalid Student ID!'),400));


    const student= await Student.findOne({student_number:studentNumber});
    if (!student) return next(new AppError(new Error(`Student ${studentNumber} does not exist!`),404))
       res.status(200).json({
        status:'success',
        data:{
            student:_.pick(student,['student_number','_id','name','course','createdAt'])
        }
    });

})
exports.updateStudent=catchAsync(async (req,res,next)=>{

    const studentNumber=req.params.id;
    let isnum = /^\d+$/.test(studentNumber);

    if (studentNumber.length!=6||!isnum) return next(new AppError(new Error('Invalid Student ID!'),400));

    const filteredBody=filterObj(req.body,'name','course')
    const student=await Student.findOneAndUpdate({student_number:studentNumber},filteredBody,{new:true,runValidators:true})
    if (!student) return next(new AppError(new Error(`Student ${studentNumber} does not exist!`),404))
   res.status(200).json({
       status:'success',
       data:{
           student:_.pick(student,['student_number','_id','name','course','createdAt'])
       }
   })
})
exports.deleteStudent=catchAsync(async (req,res,next)=>{

    const studentNumber=req.params.id;
    let isnum = /^\d+$/.test(studentNumber);

    if (studentNumber.length!=6||!isnum) return next(new AppError(new Error('Invalid Student ID!'),400));
    const student=await Student.findOneAndDelete({student_number:studentNumber})

    if (!student) return next(new AppError(new Error(`Student ${studentNumber} does not exist!`),404))
    res.status(204).json({
        status:'success',
        data:null,
    })
})