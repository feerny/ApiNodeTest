
import {Router}  from 'express';
const router = Router();
//controladores
import {getEmpleados,getEmpleadosId,postEmpleados,putEmpleados,deleteEmpleado} from '../controllers/empleados.controller.js'

router.get('/',getEmpleados)

router.get('/:id',getEmpleadosId)

router.post('/',postEmpleados)

router.put('/:id',putEmpleados)

router.delete('/:id',deleteEmpleado)

export default router;