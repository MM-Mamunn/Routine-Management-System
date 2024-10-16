import express from 'express';
const router = express.Router();
import {sectionRoutine} from '../../controllers/section/sectionRoutine.controller.js'
router.get('/fullroutine/:slug',sectionRoutine);


export default router;