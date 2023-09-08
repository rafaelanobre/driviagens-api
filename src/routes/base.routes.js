import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.js";
import { citiesSchema, flightsSchema, passengersSchema, travelsSchema } from "../schemas/baseSchemas.js";
import { createPassenger } from "../controllers/passengers.controllers.js";
import { createCity } from "../controllers/cities.controllers.js";
import { createFlight } from "../controllers/flights.controllers.js";

const baseRouter = Router();

baseRouter.post("/passengers", validateSchema(passengersSchema), createPassenger);
baseRouter.post("/cities", validateSchema(citiesSchema), createCity);

baseRouter.post("/flights", validateSchema(flightsSchema), createFlight);
baseRouter.post("/travels", validateSchema(travelsSchema), );
baseRouter.get("/flights", );
baseRouter.get("/passengers/travels", );

export default baseRouter;