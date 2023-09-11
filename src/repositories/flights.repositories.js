import { db } from "../database/database.connection.js";

export async function createFlight (origin, destination, formattedDate) {
    await db.query(`INSERT INTO flights (origin, destination, date) VALUES ($1, $2, $3)`, [origin, destination, formattedDate]);
}

export async function searchFlights (origin, destination, smallerDate, biggerDate, maxResults, offset){
    let sql = `
        SELECT f.id, c1.name AS origin, c2.name AS destination, f.date
        FROM flights f
        JOIN cities c1 ON f.origin = c1.id
        JOIN cities c2 ON f.destination = c2.id
    `;

    const params = [];

    if (origin) {
        sql += ` AND c1.name = $${params.length + 1}`;
        params.push(origin);
    }

    if (destination) {
        sql += ` AND c2.name = $${params.length + 1}`;
        params.push(destination);
    }

    if (smallerDate && biggerDate) {
        sql += ` AND f.date >= $${params.length + 1} AND f.date <= $${params.length + 2}`;
        params.push(smallerDate, biggerDate);
    }

    sql += " ORDER BY f.date";

    sql += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(maxResults, offset);

    return db.query(sql, params);
}

export const flightsRepository = { createFlight, searchFlights }