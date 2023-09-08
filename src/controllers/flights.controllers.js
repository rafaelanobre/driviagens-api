import { db } from "../database/database.connection.js";

export async function createFlight(req, res){
    const { origin, destination, date } = req.body;
    try {
        if (origin === destination){
            return res.sendStatus(409);
        }
        // await db.query("INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)", [origin, destination, date]);
        res.sendStatus(201);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}