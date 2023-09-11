import { db } from "../database/database.connection.js";

export async function createPassenger (firstName, lastName) {
    await db.query(`INSERT INTO passengers ("firstName", "lastName") VALUES ($1,$2)`, [firstName, lastName]);
}

export async function searchTravelsCount (name, maxResults, offset){
    let sql = `
        SELECT p."firstName" || ' ' || p."lastName" AS passenger, COUNT(t.id) AS travels
        FROM passengers p
        LEFT JOIN travels t ON p.id = t."passengerId"
    `;

    const params = [];

    if (name) {
        sql += ` WHERE p."firstName" || ' ' || p."lastName" ILIKE $${params.length + 1}`;
        params.push(`%${name}%`);
    }

    sql += `
        GROUP BY passenger
        ORDER BY travels DESC
        LIMIT $${params.length + 1}
        OFFSET $${params.length + 2}
    `;

    params.push(maxResults, offset);

    return db.query(sql, params);
}

export const passengerRepository = { createPassenger, searchTravelsCount }