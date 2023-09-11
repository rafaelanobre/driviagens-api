import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { citiesSchema, flightsSchema, passengersSchema, travelsSchema } from "../schemas/baseSchemas.js";
import { createPassenger, searchTravelsCount } from "../controllers/passengers.controllers.js";
import { createCity } from "../controllers/cities.controllers.js";
import { createFlight, searchFlights } from "../controllers/flights.controllers.js";
import { createTravel } from "../controllers/travels.controllers.js";
import errorHandler from "../middlewares/errorsHandler.js";

const baseRouter = Router();

baseRouter.post("/passengers", validateSchema(passengersSchema), createPassenger);
baseRouter.post("/cities", validateSchema(citiesSchema), createCity);

baseRouter.post("/flights", validateSchema(flightsSchema), createFlight);
baseRouter.post("/travels", validateSchema(travelsSchema), createTravel);
baseRouter.get("/flights", searchFlights);
baseRouter.get("/passengers/travels", searchTravelsCount);


baseRouter.use(errorHandler);

export default baseRouter;