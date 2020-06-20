const express=require('express');
const router=express.Router();
const {Student,validate,update} =require('../models/student');


router.route('/')
    .get((req,res,next)=>{

        Student.find({},(err,students)=>{
            if (err) return next(err)
            if(!students) return res.status(404),res.send("No records found")
            res.send(students)
        })
    })
    .post((req,res,next)=>{
        const name=req.body.name;
        const stdNumber=req.body.student_number;
        const stdCourse=req.body.course;

        const { error} = validate(req.body)
        if(error) return res.status(400)
        Student.findOne({student_number:stdNumber},(err,foundStudents)=>{
            if (err) return next(err)
            if (foundStudents) return res.send('Students already exists!')

            const student=new Student({
                name:name,
                student_number:stdNumber,
                course:stdCourse
            });
            student.save(err=>{
                if (err) return res.status(500).send('Something went wrong')
                res.send(student);
            });
        })
    })
    .delete((req,res,next)=>{
        Student.deleteMany({},err=>{
            if (err) return next(err)
            res.send('Deleted Successfully!');
        })
    });

router.route('/:id')
    .get((req,res)=>{
        const studentNumber=req.params.id;
        Student.findOne({student_number:studentNumber},(err, student)=>{
            if (!student) return res.status(404).send('Student does not exist!');
            res.send(student);
        })
    })

    .put((req,res,next)=>{
        const studentNumber=req.params.id;
        const name=req.body.name;
        const course=req.body.course;
        const { error} = update(req.body)
        if(error) return res.status(400)
        Student.updateOne({student_number:studentNumber},{name:name,course:course},err=>{
            if (err) return next(err)
            res.send(`Student ${studentNumber} updated successfully!`);
        })
    })
    .delete((req,res,next)=>{
        const studentNumber=req.params.id;
        Student.deleteOne({student_number:studentNumber},err=>{
            if (err) next(err)
            res.send(`Student ${studentNumber} deleted successfully!`)
        })
    });

module.exports=router;