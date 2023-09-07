import Joi from "joi";

export const passengersSchema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required()
});

export const citiesSchema = Joi.object({
    name: Joi.string().min(2).max(50).required()
});

export const flightsSchema = Joi.object({
    origin: Joi.number().integer().min(1).required(),
    destination: Joi.number().integer().min(1).required(),
    date: Joi.date().required()
});

export const travelsSchema = Joi.object({
    passengerId: Joi.number().integer().min(1).required(),
    flightId: Joi.number().integer().min(1).required()
})