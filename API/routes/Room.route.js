import express from 'express';
const router = express.Router();
import {RoomAvailability} from '../controllers/Room.controller.js'

router.get('/available/:slug1/:slug2',RoomAvailability);


export default router;