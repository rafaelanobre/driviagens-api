import { cityService } from "../services/cities.services.js";

export async function createCity(req, res){
    try {
        await cityService.createCity(req.body.name);
        res.sendStatus(201);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}