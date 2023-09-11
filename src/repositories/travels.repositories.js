import { db } from "../database/database.connection.js";

export async function createTravel(passengerId, flightId){
    return db.query(`
        INSERT INTO travels ("passengerId", "flightId")
        SELECT $1, $2
        FROM passengers p
        JOIN flights f ON p.id = $1 AND f.id = $2
    `, [passengerId, flightId]);
}

export const travelsRepository = { createTravel }