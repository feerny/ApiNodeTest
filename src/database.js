const mysqlConecction =require('mysql2/promise')
const Cre =require("./config.js");

//creo conexion a db mysql
module.exports= mysqlConecction.createPool({
    host:Cre.DB_HOST,
    user:Cre.DB_USER,
    password:Cre.DB_PASWWORD,
    port:Cre.DB_PORT,
    database:Cre.DB_NAME
})


