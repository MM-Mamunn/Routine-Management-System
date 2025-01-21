import express from 'express';
const router = express.Router();
import {personalRoutine, Profile, studentCourseInsert,Currentpersonalclass} from '../controllers/UserPersonal.controller.js'
import studentAuthorization from '../middlewares/studentAuthorizan.js';


router.post('/fullroutine/',studentAuthorization,personalRoutine);
router.get('/profile/',studentAuthorization,Profile);
router.get('/currentpersonalclass/:slug1/:slug2/',studentAuthorization,Currentpersonalclass);
router.post('/course_insert/',studentAuthorization,studentCourseInsert);
export default router;