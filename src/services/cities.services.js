import { cityRepository } from "../repositories/cities.repositories.js";

export async function createCity(name){
    try {
        const result = await cityRepository.searchCityByName(name);

        if(result.rowCount > 0){
            throw {type: "ConflictError", message:"Essa cidade já está cadastrada"};
        }
        await cityRepository.createCity(name);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export const cityService = { createCity }