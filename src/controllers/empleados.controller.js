import {mysqlConecction} from '../database.js'


export const getEmpleados = async (req,res)=>{
    const [rows]= await mysqlConecction.query('select * from employees')

    if (rows.length!==0) {
        res.json(rows)
    }else{
        res.json({Status:"empleados no encontrados"})
        res.status(404)
    }
}

export const getEmpleadosId= async(req,res)=>{
    const {id}=req.params
    const [rows]= await mysqlConecction.query('select * from employees where id=?',[id])

    if (rows.length!==0) {
        res.json(rows[0])
    }else{
        res.status(404)
        res.json({Status:"empleado no encontrado"})
     
    }
}

export const postEmpleados= async(req,res)=>{

    const {name,salary} =req.body;
     const query=`
         call employeedAddOrEdit(null,?,?);
     `
     const [rows]= await mysqlConecction.query(query,[name,salary])
 
     if (rows[0][0].id===null) {
         res.status(500)
         res.json({Status:`error al crear empleado`})
     }
     else{
         res.json({
            Status:"empleado Guardado",
            id:rows[0][0].id,
            name,
            salary
        })
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
        res.Status(500)
    }
}

export const deleteEmpleado=async(req,res)=>{
    const {id}=req.params

   const [rows]= await mysqlConecction.query("delete from employees where id=?",[id])

    if (rows.affectedRows!==0) {
        res.json({Status:`empleado ${id} Eliminado`})
    }else{
        res.json({Status:"empleado no Eliminado o no existente"})
        res.status(500)
    }
}