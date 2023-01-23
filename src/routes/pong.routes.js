
import {Router}  from 'express';
import {GetPong,GetMult,GetSum,GetRest,GetDiv} from '../controllers/pong.controller.js'
const router = Router();
//controladores
router.get("/ping",GetPong)

router.get("/rutaMult",GetMult)

router.get("/rutaSum",GetSum)

router.get("/rutaRest",GetRest)

router.get("/rutaDiv",GetDiv)


export default router;