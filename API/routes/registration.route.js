import express from 'express';
const router = express.Router();
// import { msgAll, msgNew } from '../msgControllers/msg.controllers.js';
// import {signupNew,login, userCheck} from '../signupControllers/signup.controllers.js'
import { register } from '../controllers/register.controller.js';
router.post('/new',register);
// router.post('/all',msgAll);

// router.post('/usercheck',userCheck);
// router.post('/login',login);

// router.get('/view/:id',viewSingleTask);

// router.post('/insert',insertTask);

// router.put('/update/:id',updateTask);

// router.delete('/delete/:id',deleteTask);

export default router;