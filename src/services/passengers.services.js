import { passengerRepository } from "../repositories/passengers.repositories.js";

export async function createPassenger (firstName, lastName) {
    try {
        await passengerRepository.createPassenger(firstName, lastName);
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function searchTravelsCount(name, page){
    const maxResults = 10;
    const offset = (page - 1) * maxResults;
    try{
        if (isNaN(page) || page <= 0) {
            return res.status(400).send({ message: "Invalid page value" });
        }

        const travels = await passengerRepository.searchTravelsCount(name, maxResults, offset);

        if (travels.rowCount > maxResults) {
            return res.status(500).send({ message: "Too many results" });
        }

        return travels;
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export const passengerService = { createPassenger, searchTravelsCount }