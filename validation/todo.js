import joi from 'joi';

export const createTodo = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  dueDate: joi.string().isoDate().required(),
  status:joi.string().required(),
});


export const updateTodo = joi.object({
  title: joi.string(),
  description: joi.string(),
  dueDate: joi.string().isoDate(),
  status:joi.string(),
});