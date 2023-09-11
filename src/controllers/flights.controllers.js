import { flightsService } from "../services/flights.services.js";

export async function createFlight(req, res){
    const { origin, destination, date } = req.body;
    try {
        await flightsService.createFlight(origin, destination, date);
        res.sendStatus(201);
    }
    catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function searchFlights(req,res){
    const { origin, destination, page = 1 } = req.query;
    const smallerDate = req.query["smaller-date"];
    const biggerDate = req.query["bigger-date"];
    try{
        const flights= await flightsService.searchFlights(origin, destination, smallerDate, biggerDate, page);

        res.status(200).send(flights);

    }catch(err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}