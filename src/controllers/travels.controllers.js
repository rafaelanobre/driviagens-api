import { travelsService } from "../services/travels.services.js";

export async function createTravel(req, res){
    const { passengerId, flightId } = req.body;
    try {
        const travel = await travelsService.createTravel(passengerId, flightId);

        if (travel.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.sendStatus(201);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}