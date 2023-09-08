import { db } from "../database/database.connection.js";

export async function createCity(req, res){
    const { name } = req.body;
    try {
        await db.query("INSERT INTO cities (name) VALUES ($1)", [name]);
        res.sendStatus(201);
    }
    catch (err){
        if (err.constraint === "unique_city_name") {
            return res.status(409).send({ message: "Essa cidade já está cadastrada." });
        } else {
            const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
            res.status(500).send(errorMessage);
        }
    }
}