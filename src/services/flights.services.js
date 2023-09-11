import { cityRepository } from "../repositories/cities.repositories.js";
import { flightsRepository } from "../repositories/flights.repositories.js";

export async function createFlight (origin, destination, date) {
    try {
        if (origin === destination){
            return res.sendStatus(409);
        }
        const formatDate = (date) => {
            const [day, month, year] = date.split('-');
            return `${year}-${month}-${day}`;
        };

        const formattedDate = formatDate(date);

        const originExists = await cityRepository.searchCity(origin);
        const destinationExists = await cityRepository.searchCity(destination);

        if (originExists.rowCount === 0 || destinationExists.rowCount === 0) {
            return res.sendStatus(404);
        }

        await flightsRepository.createFlight(origin, destination, formattedDate);
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export async function searchFlights(origin, destination, smallerDate, biggerDate, page){
    const maxResults = 10;
    const offset = (page - 1) * maxResults;
    try{
        if(isNaN(page) || page <=0){
            return res.status(400).send({message: "Invalid page value"})
        }
    
        if ((smallerDate && !biggerDate) || (!smallerDate && biggerDate)) {
            return res.status(422).json({ error: "Parâmetros 'smaller-date' e 'bigger-date' devem ser fornecidos juntos" });
        }

        if (smallerDate && biggerDate) {
            const smallerDateParsed = new Date(smallerDate);
            const biggerDateParsed = new Date(biggerDate);
        
            if (smallerDateParsed > biggerDateParsed) {
                return res.status(400).json({ error: "'smaller-date' não pode ser maior que 'bigger-date'" });
            }
        }

        const {rows: result} = await flightsRepository.createFlight(origin, destination, smallerDate, biggerDate, maxResults, offset);

        if (result.rowCount > 0) {
            return [];
        }

        const flights = result.map((row) => {
            const formattedDate = new Date(row.date).toLocaleDateString("pt-BR").replace(/\//g, '-');
            return { ...row, date: formattedDate };
        });

        return flights;
    }catch (err){
        const errorMessage = err ? err : "Ocorreu um erro interno no servidor.";
        res.status(500).send(errorMessage);
    }
}

export const flightsService = { createFlight, searchFlights }