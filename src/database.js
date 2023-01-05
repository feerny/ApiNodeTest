import {createPool} from 'mysql2/promise'
import { DB_HOST,DB_USER,DB_PASWWORD,DB_PORT,DB_NAME } from "./config.js";

export const mysqlConecction=createPool({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASWWORD,
    port:DB_PORT,
    database:DB_NAME
})

