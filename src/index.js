import  app  from "./app.js";
import { PORT } from "./config.js";

//server
app.listen(PORT,()=>{
    console.log("server on port ",PORT);
})
