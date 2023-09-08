import { db } from "../database/database.connection.js";

export async function createPassenger (req, res) {
    const { firstName, lastName } = req.body;
    try {
        await db.query(`INSERT INTO passengers (firstName, firstName) VALUES ($1,$2)`, [firstName, lastName]);
        res.sendStatus(201);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}