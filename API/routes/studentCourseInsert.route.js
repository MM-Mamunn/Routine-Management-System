import express from 'express';
import studentAuthorization from '../middlewares/studentAuthorizan.js';
const router = express.Router();

import { studentCourseInsert } from '../controllers/studentCourseInsert.contoller.js';

router.post('/new',studentAuthorization,studentCourseInsert);
// router.post('/all',msgAll);

// router.post('/usercheck',userCheck);
// router.post('/login',login);

// router.get('/view/:id',viewSingleTask);

// router.post('/insert',insertTask);

// router.put('/update/:id',updateTask);

// router.delete('/delete/:id',deleteTask);

export default router;