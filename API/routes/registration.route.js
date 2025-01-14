import express from 'express';
const router = express.Router();
import { register } from '../controllers/register.controller.js';
router.post('/new',register);


export default router;