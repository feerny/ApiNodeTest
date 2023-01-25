
//ejecuta config de dotenv
require("dotenv").config();

module.exports={
//constantes de puerto
 PORT: process.env.PORT || 3000,

//constantes de bd
 DB_HOST: process.env.DB_HOST || "localhost",
 DB_USER: process.env.DB_USER || "root",
 DB_PASWWORD: process.env.DB_PASWWORD || "",
 DB_PORT: process.env.DB_PORT || 3306,
 DB_NAME: process.env.DB_NAME || "company"
}