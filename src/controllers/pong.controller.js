import {mysqlConecction} from '../database.js'

export const GetPong= async(req,res)=>{
    const [result] = await mysqlConecction.query('select "pong" AS result' )
    res.json(result[0])
}