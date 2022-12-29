import {mysqlConecction} from '../database.js'


export const getEmpleados = async (req,res)=>{
    const [rows]= await mysqlConecction.query('select * from employees')

    if (rows.length!==0) {
        res.json(rows)
    }else{
        console.log(rows);
    }
}

export const getEmpleadosId= async(req,res)=>{
    const {id}=req.params
    const [rows]= await mysqlConecction.query('select * from employees where id=?',[id])

    if (rows.length!==0) {
        res.json(rows[0])
    }else{
        res.json({Status:"empleado no encontrado"})
        console.log(rows);
    }
}

export const postEmpleados= async(req,res)=>{

    const {id,name,salary} =req.body;
     const query=`
         call employeedAddOrEdit(?,?,?);
     `
     const [rows]= await mysqlConecction.query(query,[id,name,salary])
 
     if (rows[0][0].id==null) {
         res.json({Status:"falta id"})
     }
     else{
         res.json({Status:"empleado Guardado"})
         console.log(rows);
     }
 }

export const putEmpleados=async(req,res)=>{
    const {id}=req.params
    const {name,salary} =req.body;
    const query=`
        call employeedAddOrEdit(?,?,?);
    `
    const [rows] = await mysqlConecction.query(query,[id,name,salary])


    if (rows[1].affectedRows!==0) {
        res.json({Status:`empleado ${id} Actualizado`})
    }else{
        res.json({Status:"empleado no Actualizado o no existente"})
        console.log(rows);
    }
}

export const deleteEmpleado=async(req,res)=>{
    const {id}=req.params

   const [rows]= await mysqlConecction.query("delete from employees where id=?",[id])

    if (rows.affectedRows!==0) {
        res.json({Status:`empleado ${id} Eliminado`})
    }else{
        res.json({Status:"empleado no Eliminado o no existente"})
        console.log(rows);
    }
}