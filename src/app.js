import Express  from 'express';
import EmpleadosRutas from './routes/empleados.routes.js'
import pongRutas from './routes/pong.routes.js'


const app = Express()

//middelwares
app.use(Express.json());

//routes
app.use("/api/empleados",EmpleadosRutas)
app.use("/api/extra",pongRutas)
app.use((req,res,nxt)=>{
    res.status(404).json({message:"ruta no encontrada"})
})

export default app;