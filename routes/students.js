const express =require( 'express');
const router=express.Router();
const {getAllStudents,getSingleStudent,addStudent,updateStudent,deleteStudent}= require('../controllers/studentsController');


router.route('/')
    .get(getAllStudents)
    .post(addStudent)


router.route('/:id')
    .get(getSingleStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

module.exports= router;