
const  Router=require('express');
const router = Router();
//controladores
const Controllers =require('../controllers/empleados.controller.js')

const upload=require('../utils/multer.js');

router.get('/',Controllers.getEmpleados)

router.get('/:id',Controllers.getEmpleadosId)

router.post('/',upload.single("imagen"),Controllers.postEmpleados)

router.put('/:id',Controllers.putEmpleados)

router.delete('/:id',Controllers.deleteEmpleado)

router.patch('/:id',Controllers.putEmpleados)

module.exports= router;