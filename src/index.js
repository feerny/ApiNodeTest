const app=require("./app.js");

//llama constante de puerto 
const PORT=require('./config.js');

//server
app.listen(PORT.PORT,()=>{
    console.log("server on port ",PORT.PORT);
})

