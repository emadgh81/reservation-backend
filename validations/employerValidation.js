const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().required()
});

const otpSchema = Joi.object({
    phone: Joi.string().required(),
    otp: Joi.string().required()
});

module.exports = {
    registerSchema,
    otpSchema
}