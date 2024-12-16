import express from 'express';
const router = express.Router();
import {RoomAvailability} from '../controllers/Room.controller.js'

router.get('/available/:day/:slot/:building?',RoomAvailability);


export default router;