import express from 'express';
const router = express.Router();
import {personalRoutine} from '../controllers/personalRoutine.controller.js'
import studentAuthorization from '../middlewares/studentAuthorizan.js';

router.post('/fullroutine/',studentAuthorization,personalRoutine);


export default router;