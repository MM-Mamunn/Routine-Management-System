import express from 'express';
import studentAuthorization from '../middlewares/studentAuthorizan.js';
const router = express.Router();
// import { msgAll, msgNew } from '../msgControllers/msg.controllers.js';
// import {signupNew,login, userCheck} from '../signupControllers/signup.controllers.js'
// import { register } from '../controllers/register.controller.js';
import { test } from '../controllers/studentCourseInsert.contoller.js';
router.post('/new',studentAuthorization,test);
// router.post('/all',msgAll);

// router.post('/usercheck',userCheck);
// router.post('/login',login);

// router.get('/view/:id',viewSingleTask);

// router.post('/insert',insertTask);

// router.put('/update/:id',updateTask);

// router.delete('/delete/:id',deleteTask);

export default router;