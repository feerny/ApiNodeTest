const express= require('express')
const router = express.Router();

const mysqlConecction= require('../database')

router.get('/',(req,res)=>{
    mysqlConecction.query('select * from employees',(err,rows,fields)=>{
        if (!err) {
            res.json(rows)
        }else{
            console.log(err);
        }
    })
})

router.get('/:id',(req,res)=>{
    const {id}=req.params

    mysqlConecction.query('select * from employees where id=?',[id],(err,rows,fields)=>{
        if (!err) {
            res.json(rows[0])
        }else{
            res.json(err)
            console.log(err);
        }
    })
})

router.post('/',(req,res)=>{

   const {id,name,salary} =req.body;
    const query=`
        call employeedAddOrEdit(?,?,?);
    `
    mysqlConecction.query(query,[id,name,salary],(err,rows,fields)=>{
        if (!err) {
            res.json({Status:"empleado guardado"})
        }else{
            res.json({Status:"empleado no guardado"})
            console.log(err);
        }
    })
})

router.put('/:id',(req,res)=>{
    const {id}=req.params
    const {name,salary} =req.body;
    const query=`
        call employeedAddOrEdit(?,?,?);
    `
    mysqlConecction.query(query,[id,name,salary],(err,rows,fields)=>{
        if (!err) {
            res.json({Status:`empleado ${id} Actualizado`})
        }else{
            res.json({Status:"empleado no Actualizado"})
            console.log(err);
        }
    })
})

router.delete('/:id',(req,res)=>{
    const {id}=req.params

    mysqlConecction.query("delete from employees where id=?",[id],(err,rows,fields)=>{
        if (!err) {
            res.json({Status:`empleado ${id} Eliminado`})
        }else{
            res.json({Status:"empleado no Eliminado"})
            console.log(err);
        }
    })
})

module.exports=router;