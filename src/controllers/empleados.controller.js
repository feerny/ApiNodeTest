import { mysqlConecction } from '../database.js'


export const getEmpleados = async (req, res) => {

    try {
        const [rows] = await mysqlConecction.query('select * from employees')

        if (rows.length !== 0) {
            return res.json(rows)
        } else {
            return res.status(404).json({ Status: "empleados no encontrados" })

        }
    } catch (error) {
        const errors = `${error}`;
        console.log(errors.split(" ").slice(1).join(" "));
        return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
    }

}



export const getEmpleadosId = async (req, res) => {

    try {
        const { id } = req.params
        const [rows] = await mysqlConecction.query('select * from employees where id=?', [id])

        if (rows.length !== 0) {
            return res.json(rows[0])
        } else {
            return res.status(404).json({ Status: "empleado no encontrado" })


        }
    } catch (error) {
        const errors = `${error}`;
        console.log(errors.split(" ").slice(1).join(" "));
        return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
    }

}

export const postEmpleados = async (req, res) => {

    try {
        const { name, salary } = req.body;
        const query = `
            call employeedAddOrEdit(null,?,?);
        `
        const [rows] = await mysqlConecction.query(query, [name, salary])

        if (rows[0][0].id === null) {
            return res.status(500).json({ Status: `error al crear empleado` })

        }
        else {
            return res.json({
                Status: "empleado Guardado",
                id: rows[0][0].id,
                name,
                salary
            })
        }
    } catch (error) {
        const errors = `${error}`;
        console.log(errors.split(" ").slice(1).join(" "));
        return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
    }


}

export const putEmpleados = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body;
    const query = `
        call employeedAddOrEdit(?,?,?);
    `
    try {
        const rows = await mysqlConecction.query(query, [id, name, salary])
        console.log(rows);
        if (rows[1].affectedRows !== 0) {
            return res.json({ Status: `empleado ${id} Actualizado` })
        } else {
            return res.status(500).json({ Status: "empleado no Actualizado o no existente" })

        }
    } catch (error) {
        const errors = `${error}`;
        console.log(errors.split(" ").slice(1).join(" "));
        return res.status(500).json({ message: `${errors.split(" ").slice(1).join(" ")}` })
    }
}

export const deleteEmpleado = async (req, res) => {
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