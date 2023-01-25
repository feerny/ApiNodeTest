const EmpleadosRutas =require( './routes/empleados.routes.js')
const Express=require('express')

const app = Express()

//middelwares
app.use(Express.json());

//routes
app.use("/api/empleados",EmpleadosRutas)
app.use((req,res,nxt)=>{
    res.status(404).json({message:"ruta no encontrada"})
})

module.exports= app;