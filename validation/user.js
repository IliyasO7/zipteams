import joi from 'joi';


export const createUser = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required()
});

export const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});


export const updateUser = joi.object({
    username: joi.string(),
    email: joi.string().email(),
  });