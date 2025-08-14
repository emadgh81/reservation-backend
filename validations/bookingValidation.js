const Joi = require('joi');

const bookingSchema = Joi.object({
  employerId: Joi.number().required(),
  customerId: Joi.number().optional(),
  date: Joi.date().required(),
  time: Joi.string().required()
});
module.exports = {bookingSchema}