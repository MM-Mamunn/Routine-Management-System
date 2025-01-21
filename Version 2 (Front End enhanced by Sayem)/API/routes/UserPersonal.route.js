import express from 'express';
const router = express.Router();
import {personalRoutine, Profile, studentCourseInsert} from '../controllers/UserPersonal.controller.js'
import studentAuthorization from '../middlewares/studentAuthorizan.js';


router.post('/fullroutine/',studentAuthorization,personalRoutine);
router.get('/profile/',studentAuthorization,Profile);
router.post('/course_insert',studentAuthorization,studentCourseInsert);
export default router;