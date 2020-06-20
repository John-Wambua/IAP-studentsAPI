const express=require('express');
const mongoose=require('mongoose');
const Joi=require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const bodyParser=require('body-parser')
const app=express();
const port =3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan('tiny'));


mongoose.connect('mongodb://localhost/studentsDB',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex: true,});


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

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.route('/api/v1/student')
    .get((req,res)=>{
        Student.find({},(err,students)=>{
            if (err) return res.status(500).send("Something went wrong")
            if(!students) return res.status(404),res.send("No records found")
            res.send(students)
        })
    })
    .post((req,res)=>{
        const name=req.body.name;
        const stdNumber=req.body.student_number;
        const stdCourse=req.body.course;

        const { error} = validateInput(req.body)

        if(error) return res.status(400)

        Student.findOne({student_number:stdNumber},(err,foundStudents)=>{
            if (err) return res.status(500).send("Something went wrong")
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
    .delete((req,res)=>{
        Student.deleteMany({},err=>{
            if (err) return res.status(500).send('Something went wrong')
            res.send('Deleted Successfully!');
        })
    });

app.route('/api/v1/student/:id')
    .get((req,res)=>{
        const studentNumber=req.params.id;
        Student.findOne({student_number:studentNumber},(err, student)=>{
            if (!student) return res.status(404).send('Student does not exist!');
            res.send(student);
        })
    })

    .put((req,res)=>{
        const studentNumber=req.params.id;
        const name=req.body.name;
        const course=req.body.course;
        const { error} = validateUpdate(req.body)
        if(error) return res.status(400)
        Student.updateOne({student_number:studentNumber},{name:name,course:course},err=>{
            if (err) return res.status(500).send('Something went wrong')
            res.send(`Student ${studentNumber} updated successfully!`);
        })
    })
    .delete((req,res)=>{
        const studentNumber=req.params.id;
        Student.deleteOne({student_number:studentNumber},err=>{
            if (err) return res.status(500).send('Something went wrong')
            res.send(`Student ${studentNumber} deleted successfully!`)
        })

    });

const validateInput=student=>{
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        student_number: Joi.string ().length(6).required(),
        course: Joi.string().min(5).max(100).required(),
    });

    return schema.validate(student);

}
const validateUpdate=student=>{
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required(),
        course: Joi.string().min(5).max(100).required(),
    });

    return schema.validate(student);

}


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})