import { config } from "dotenv";


//ejecuta config de dotenv
config()

//constantes de puerto
export const PORT=process.env.PORT || 3000

//constantes de bd
export const DB_HOST=process.env.DB_HOST || "localhost"
export const DB_USER=process.env.DB_USER || "root"
export const DB_PASWWORD=process.env.DB_PASWWORD || ""
export const DB_PORT=process.env.DB_PORT || 3306
export const DB_NAME=process.env.DB_NAME || "company"