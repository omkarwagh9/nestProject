import * as Joi from 'joi';

export const UserSchema = Joi.object({ 
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
}).options({
    abortEarly: false,
});