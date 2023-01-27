const mysqlConecction = require('../database.js')

const cloudinary = require("../utils/cloudinary");

module.exports = {

    getEmpleados: async (req, res) => {

        try {
            const [rows] = await mysqlConecction.query('select * from employees')
    
           const myJson= rows.map(function(element){
                const imgParse = JSON.parse(element.img)
                return  {
                    id: element.id,
                    name: element.name,
                    salary: element.salary,
                    image: imgParse
                }
            })

            if (rows.length !== 0) {
                return res.json(myJson)
            } else {
                return res.status(404).json({ Status: "empleados no encontrados" })


            }
        } catch (error) {
            const errors = `${error}`;
            console.log(errors.split(" ").slice(1).join(" "));
            return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
        }

    },



    getEmpleadosId: async (req, res) => {

        try {
            const { id } = req.params
            const [rows] = await mysqlConecction.query('select * from employees where id=?', [id])
            
            const imgParse = JSON.parse(rows[0].img)

            const myJson = {
                id: rows[0].id,
                name: rows[0].name,
                salary: rows[0].salary,
                image: imgParse
            }

            if (rows.length !== 0) {
                return res.json(myJson)
            } else {
                return res.status(404).json({ Status: "empleado no encontrado" })


            }
        } catch (error) {
            const errors = `${error}`;
            console.log(errors.split(" ").slice(1).join(" "));
            return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
        }

    },

    postEmpleados: async (req, res) => {


        try {
            const { name, salary } = req.body;
            if (!req.file) {
                return res.status(500).json({ message: "porfavor suba una imagen" })
            }

            try {
                var cloudinary_image = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'empleados/'+name,
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({ message: error })
            }

            const query = `
        call employeedAddOrEdit(?,?,?,?);
        `
            const image = {
                public_id: `${cloudinary_image.public_id}`,
                url: `${cloudinary_image.secure_url}`
            }

            const imageParse = JSON.stringify(image);
            const [rows] = await mysqlConecction.query(query, [null, imageParse, name, salary])
            console.log(rows);

            if (rows[0][0].id === null || rows[0][0].id === 0) {
                return res.status(500).json({ Status: `error al crear empleado` })

            }
            else {
                return res.json({
                    Status: "empleado Guardado",
                    id: rows[0][0].id,
                    name,
                    salary,
                    image
                })
            }
        } catch (error) {
            const errors = `${error}`;
            console.log(errors.split(" ").slice(1).join(" "));
            return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
        }


    },

    putEmpleados: async (req, res) => {
        const { id } = req.params
        const { name, salary } = req.body;
        if (!req.file) {
            return res.status(500).json({ message: "porfavor suba una imagen" })
        }

        try {
            const [data] = await mysqlConecction.query('select * from employees where id=?', [id])
            const public_id = JSON.parse(data[0].img)
            const folder_id=public_id.public_id.split('/')
            const folder_rute=folder_id[0]+"/"+folder_id[1]
            const resultDeleteImg= await cloudinary.uploader.destroy(public_id.public_id);
            const resultDeleteFolder= await cloudinary.api.delete_folder(folder_rute);
            console.log(resultDeleteImg.result);
            console.log(resultDeleteFolder.deleted[0]);
            if (resultDeleteImg.result === "not found"){
                return res.status(400).json({ message: "Please provide correct public_id" })
            }
            if (resultDeleteImg.result !== "ok"){
                return res.status(400).json({ message: "Try again later."})
            }
            
            var cloudinary_image = await cloudinary.uploader.upload(req.file.path, {
                folder: 'empleados/'+name,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error })
        }
        const query = `
    call employeedAddOrEdit(?,?,?,?);
    `
        try {
            const image = {
                public_id: `${cloudinary_image.public_id}`,
                url: `${cloudinary_image.secure_url}`
            }

            const imageParse = JSON.stringify(image);
            const [rows] = await mysqlConecction.query(query, [id,imageParse, name, salary])
            console.log(rows);
            if (rows.affectedRows !== 0) {
                return res.json({ Status: `empleado ${id} Actualizado` })
            } else {
                return res.status(500).json({ Status: "empleado no Actualizado o no existente" })

            }
        } catch (error) {
            const errors = `${error}`;
            console.log(errors.split(" ").slice(1).join(" "));
            return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
        }
    },

    deleteEmpleado: async (req, res) => {
        try {
            const { id } = req.params

            const [rows] = await mysqlConecction.query("delete from employees where id=?", [id])

            if (rows.affectedRows !== 0) {
                return res.json({ Status: `empleado ${id} Eliminado` })
            } else {
                return res.status(500).json({ Status: "empleado no Eliminado o no existente" })

            }
        } catch (error) {
            const errors = `${error}`;
            console.log(errors.split(" ").slice(1).join(" "));
            return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
        }

    }
}