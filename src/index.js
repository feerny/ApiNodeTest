import Express  from 'express';
import EmpleadosRutas from './routes/empleados.routes.js'

const app = Express()


//settings
app.set('port',process.env.PORT || 3000);

//middelwares
app.use(Express.json());


//routes
app.use("/api/empleados",EmpleadosRutas)

//server
app.listen(app.get('port'),()=>{
    console.log("server on port ",app.get('port'));
})

