import {mysqlConecction} from '../database.js'

export const GetPong= async(req,res)=>{
    const [result] = await mysqlConecction.query('select "pong" AS result' )
    res.json(result[0])
}

export const GetMult=async(req,res)=>{
    const [result]= await mysqlConecction.query('select (100*9) AS result')
    res.json(result[0])
}

export const GetSum=async(req,res)=>{
    const [result] =await mysqlConecction.query('select (400+100) AS result')
    res.json(result[0])
}

export const GetRest=async(req,res)=>{
    const [result] = await mysqlConecction.query('select (400-100) AS result')
    res.json(result[0])
}

export const GetDiv=async(req,res)=>{
    const [result]=await mysqlConecction.query('select TRUNCATE((400/2),2) AS result')
    res.json(result[0])
}