import { db } from "../database/database.connection.js";

export async function createCity(name){
    await db.query(`INSERT INTO cities (name) VALUES ($1)`, [name]);
}

export async function searchCity(id){
    return db.query(`SELECT 1 FROM cities WHERE id = $1`, [id]);
}

export async function searchCityByName(name){
    return db.query(`SELECT 1 FROM cities WHERE name = $1`, [name]);
}

export const cityRepository = { createCity, searchCity, searchCityByName };