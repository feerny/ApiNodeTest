const multer = require("multer");
const path = require("path");

module.exports= multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext =path.extname(file.originalname);

        if (ext !== ".jpg" && ext !== ".png" && ext !==".jpeg") {
            cb(
                new Error(
                    "El archivo no es soportado, solo imagenes formato jpg, png y jpeg"
                ),
                false
            );
            return;
        };
        cb(null,true)
    }
    
});