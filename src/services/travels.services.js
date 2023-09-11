import { travelsRepository } from "../repositories/travels.repositories.js";

export async function createTravel(passengerId, flightId){
    try {
        return travel = await travelsRepository.createTravel(passengerId, flightId);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export const travelsService = { createTravel }