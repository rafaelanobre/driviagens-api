import { passengerService } from "../services/passengers.services.js";

export async function createPassenger (req, res) {
    const { firstName, lastName } = req.body;
    try {
        await passengerService.createPassenger(firstName, lastName);
        res.sendStatus(201);
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function searchTravelsCount(req, res) {
    const { name, page = 1 } = req.query;
    try{
        const travels = await passengerService.searchTravelsCount(name, page, maxResults, offset);

        res.status(200).send(travels.rows);
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}