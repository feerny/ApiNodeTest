
import {Router}  from 'express';
import {GetPong} from '../controllers/pong.controller.js'
const router = Router();
//controladores
router.get("/ping",GetPong)


export default router;